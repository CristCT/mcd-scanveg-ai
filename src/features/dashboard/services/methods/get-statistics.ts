import { httpService } from '../../../../shared/services/http.service';
import type {
  ApiResponse,
  Statistics,
  DiseaseDistribution,
} from '../../../../shared/types';
import { formatYMDLocal } from '../../utils/dateUtils';
import { DISEASE_COLORS } from '../../../../shared/constants';
import {
  DASHBOARD_ERRORS,
  DASHBOARD_ENDPOINTS,
  DEFAULT_PAGE,
  DEFAULT_RECENT_ANALYSES_SIZE,
} from '../../constants';
import type {
  BackendStatisticsResponse,
  BackendDiseasesDistributionResponse,
  DiseaseColorMap,
  CalculatedStats,
} from '../../interfaces';
import { getRecentAnalyses } from './get-recent-analyses';

/**
 * Gets the appropriate color for a disease type
 * @private
 * @param disease - The disease name
 * @returns Color string for the specified disease
 */
function getDiseaseColor(disease: string): string {
  const colorMap: DiseaseColorMap = {
    Tomato_healthy: DISEASE_COLORS.HEALTHY,
    Tomato_Late_blight: DISEASE_COLORS.LATE_BLIGHT,
    Tomato_Early_blight: DISEASE_COLORS.EARLY_BLIGHT,
    Tomato__Tomato_mosaic_virus: DISEASE_COLORS.MOSAIC_VIRUS,
    Tomato_Bacterial_spot: DISEASE_COLORS.BACTERIAL_SPOT,
    Tomato_Leaf_Mold: DISEASE_COLORS.LEAF_MOLD,
    Tomato_Septoria_leaf_spot: DISEASE_COLORS.SEPTORIA_LEAF_SPOT,
    Tomato_Spider_mites_Two_spotted_spider_mite: DISEASE_COLORS.SPIDER_MITES,
    Tomato__Target_Spot: DISEASE_COLORS.TARGET_SPOT,
    Tomato__Tomato_YellowLeaf__Curl_Virus: DISEASE_COLORS.YELLOW_LEAF_CURL,
  };
  return colorMap[disease] || DISEASE_COLORS.DEFAULT;
}

/**
 * Gets the general dashboard statistics
 * @returns Promise with statistics data
 */
export async function getStatistics(): Promise<ApiResponse<Statistics>> {
  try {
    const response = await httpService.get<BackendStatisticsResponse>(
      DASHBOARD_ENDPOINTS.STATISTICS
    );

    if (response.success && response.data) {
      const recentAnalysesResponse = await getRecentAnalyses(
        DEFAULT_PAGE,
        DEFAULT_RECENT_ANALYSES_SIZE
      );
      let todayCount = 0;
      let totalConfidence = 0;
      let analysisCount = 0;

      if (recentAnalysesResponse.success && recentAnalysesResponse.data) {
        const today = formatYMDLocal(new Date());
        const stats: CalculatedStats = {
          todayCount: 0,
          totalConfidence: 0,
          analysisCount: 0,
        };

        recentAnalysesResponse.data.analyses.forEach((analysis: any) => {
          let analysisDate: string;
          try {
            const date = new Date(analysis.date);
            analysisDate = formatYMDLocal(date);
          } catch {
            analysisDate = analysis.date.split('T')[0];
          }

          if (analysisDate === today) {
            stats.todayCount++;
          }

          stats.totalConfidence += analysis.confidence;
          stats.analysisCount++;
        });

        todayCount = stats.todayCount;
        totalConfidence = stats.totalConfidence;
        analysisCount = stats.analysisCount;
      }

      const diseasesResponse =
        await httpService.get<BackendDiseasesDistributionResponse>(
          DASHBOARD_ENDPOINTS.DISEASES_DISTRIBUTION
        );

      let diseases: DiseaseDistribution[] = [];
      if (diseasesResponse.success && diseasesResponse.data) {
        diseases = diseasesResponse.data.data.diseases.map(disease => ({
          name: disease.name,
          count: disease.count,
          color: getDiseaseColor(disease.name),
        }));
      }

      const backendData = response.data.data;
      const transformedData: Statistics = {
        totalAnalysis: backendData.total_analyses,
        todayAnalysis: todayCount,
        averageConfidence:
          analysisCount > 0 ? Math.round(totalConfidence / analysisCount) : 0,
        healthyTomatoes:
          backendData.total_analyses > 0
            ? Math.round(
                (backendData.healthy_plants / backendData.total_analyses) * 100
              )
            : 0,
        diseases: diseases,
      };

      return {
        success: true,
        data: transformedData,
      };
    } else {
      return {
        success: false,
        error:
          response.data?.message || DASHBOARD_ERRORS.STATISTICS_FETCH_FAILED,
      };
    }
  } catch {
    return {
      success: false,
      error: DASHBOARD_ERRORS.CONNECTION_ERROR_STATISTICS,
    };
  }
}
