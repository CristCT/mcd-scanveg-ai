import { httpService } from '../../../../shared/services/http.service';
import type {
  ApiResponse,
  AnalysisResult,
  PaginationInfo,
} from '../../../../shared/types';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DASHBOARD_ERRORS,
  DASHBOARD_ENDPOINTS,
} from '../../constants';
import type {
  BackendRecentAnalysesResponse,
  BackendAnalysisItem,
} from '../../interfaces';

/**
 * Gets recent analyses with pagination
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 10)
 * @returns Promise with analyses and pagination information
 */
export async function getRecentAnalyses(
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<
  ApiResponse<{ analyses: AnalysisResult[]; pagination: PaginationInfo }>
> {
  try {
    const response = await httpService.get<BackendRecentAnalysesResponse>(
      `${DASHBOARD_ENDPOINTS.RECENT_ANALYSES}?page=${page}&page_size=${pageSize}`
    );

    if (response.success && response.data) {
      const transformedAnalyses = response.data.data.analyses.map(
        (item: BackendAnalysisItem): AnalysisResult => ({
          id: item.id,
          image_filename: item.filename || item.image_info?.filename,
          image_size: item.image_info?.size,
          image_format: item.image_info?.format,
          disease: item.prediction || 'Unknown',
          confidence: item.confidence,
          status: item.status,
          processing_time: item.processing_time,
          model_version: item.model_version,
          date: item.created_at,
          created_at: item.created_at,
          updated_at: item.updated_at,
          raw_predictions: item.all_predictions
            ? JSON.stringify(item.all_predictions)
            : undefined,
          error_message: item.error_message,
          success: item.success ?? true,
        })
      );

      return {
        success: true,
        data: {
          analyses: transformedAnalyses,
          pagination: response.data.data.pagination,
        },
      };
    } else {
      return {
        success: false,
        error:
          response.data?.message ||
          DASHBOARD_ERRORS.RECENT_ANALYSES_FETCH_FAILED,
      };
    }
  } catch {
    return {
      success: false,
      error: DASHBOARD_ERRORS.CONNECTION_ERROR_RECENT_ANALYSES,
    };
  }
}
