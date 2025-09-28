import { httpService } from '../../../../shared/services/http.service';
import type { ApiResponse, AnalysisResult } from '../../../../shared/types';
import { DASHBOARD_ERRORS, DASHBOARD_ENDPOINTS } from '../../constants';
import type { BackendAnalysisResponse } from '../../interfaces';

/**
 * Gets a specific analysis by its unique identifier
 * @param analysisId - The unique ID of the analysis to retrieve
 * @returns Promise with the analysis result
 */
export async function getAnalysisById(
  analysisId: number
): Promise<ApiResponse<AnalysisResult>> {
  try {
    const response = await httpService.get<BackendAnalysisResponse>(
      `${DASHBOARD_ENDPOINTS.ANALYSIS_BY_ID}/${analysisId}`
    );

    if (response.success && response.data) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        error: response.data?.message || DASHBOARD_ERRORS.ANALYSIS_FETCH_FAILED,
      };
    }
  } catch {
    return {
      success: false,
      error: DASHBOARD_ERRORS.CONNECTION_ERROR_ANALYSIS,
    };
  }
}
