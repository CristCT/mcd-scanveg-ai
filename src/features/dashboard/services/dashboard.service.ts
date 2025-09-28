import { httpService } from '../../../shared/services/http.service';
import type { ApiResponse } from '../../../shared/types';
import type {
  Statistics,
  DailyStatsResponse,
  AnalysisResult,
  PaginationInfo,
  DiseaseDistribution,
} from '../../../shared/types';
import { formatYMDLocal } from '../utils/dateUtils';
import { DISEASE_COLORS, WEEK_DAYS } from '../../../shared/constants';
import type {
  BackendAnalysisItem,
  BackendStatisticsResponse,
  BackendRecentAnalysesResponse,
  BackendDiseasesDistributionResponse,
  BackendWeekStatsResponse,
  BackendAnalysisResponse,
  DiseaseColorMap,
  DailyAnalysisData,
  DayInfo,
  DateParts,
  CalculatedStats,
} from '../interfaces';

class DashboardService {
  private getDiseaseColor(disease: string): string {
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
   */
  async getStatistics(): Promise<ApiResponse<Statistics>> {
    try {
      const response =
        await httpService.get<BackendStatisticsResponse>('/api/statistics');

      if (response.success && response.data) {
        const recentAnalysesResponse = await this.getRecentAnalyses(1, 100);
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

          recentAnalysesResponse.data.analyses.forEach(analysis => {
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
            '/api/diseases/distribution'
          );

        let diseases: DiseaseDistribution[] = [];
        if (diseasesResponse.success && diseasesResponse.data) {
          diseases = diseasesResponse.data.data.diseases.map(disease => ({
            name: disease.name,
            count: disease.count,
            color: this.getDiseaseColor(disease.name),
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
                  (backendData.healthy_plants / backendData.total_analyses) *
                    100
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
          error: response.data?.message || 'Failed to fetch statistics',
        };
      }
    } catch {
      return {
        success: false,
        error: 'Error de conexión al obtener estadísticas',
      };
    }
  }

  /**
   * Gets recent analyses with pagination
   * @param page - Page number (default: 1)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise with analyses and pagination information
   */
  async getRecentAnalyses(
    page: number = 1,
    pageSize: number = 10
  ): Promise<
    ApiResponse<{ analyses: AnalysisResult[]; pagination: PaginationInfo }>
  > {
    try {
      const response = await httpService.get<BackendRecentAnalysesResponse>(
        `/api/analyses/recent?page=${page}&page_size=${pageSize}`
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
          error: response.data?.message || 'Failed to fetch recent analyses',
        };
      }
    } catch {
      return {
        success: false,
        error: 'Error de conexión al obtener análisis recientes',
      };
    }
  }

  /**
   * Gets the week statistics for a specified date range
   * @param weekStart - Start date in YYYY-MM-DD format
   * @param weekEnd - End date in YYYY-MM-DD format
   * @returns Promise with daily statistics response
   */
  async getWeekStats(
    weekStart: string,
    weekEnd: string
  ): Promise<ApiResponse<DailyStatsResponse>> {
    try {
      const response = await httpService.get<BackendWeekStatsResponse>(
        `/api/analyses/week-stats?week_start=${weekStart}&week_end=${weekEnd}`
      );

      if (response.success && response.data?.data) {
        const dailyAnalysisData: DailyAnalysisData[] =
          response.data.data.dailyAnalysis || [];

        const startDateParts = weekStart.split('-');
        const dateParts: DateParts = {
          year: parseInt(startDateParts[0]),
          month: parseInt(startDateParts[1]) - 1,
          day: parseInt(startDateParts[2]),
        };
        const startDate = new Date(
          dateParts.year,
          dateParts.month,
          dateParts.day
        );
        const allDaysMap = new Map<number, DayInfo>();

        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const dayOfWeek = date.getDay();

          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const dateString = `${year}-${month}-${day}`;

          const dayData = dailyAnalysisData.find(
            item => item.date === dateString
          );

          const dayInfo: DayInfo = {
            day: dayOfWeek,
            count: dayData ? dayData.total : 0,
            date: dateString,
          };

          allDaysMap.set(dayOfWeek, dayInfo);
        }

        const orderedDays: DayInfo[] = [];

        for (let i = WEEK_DAYS.MONDAY; i <= WEEK_DAYS.SATURDAY; i++) {
          if (allDaysMap.has(i)) {
            orderedDays.push(allDaysMap.get(i)!);
          }
        }
        if (allDaysMap.has(WEEK_DAYS.SUNDAY)) {
          orderedDays.push(allDaysMap.get(WEEK_DAYS.SUNDAY)!);
        }

        const transformedData: DailyStatsResponse = {
          dailyAnalysis: orderedDays,
          start_date: response.data.data.start_date,
          end_date: response.data.data.end_date,
        };

        return {
          success: true,
          data: transformedData,
        };
      } else {
        return {
          success: false,
          error: response.data?.message || 'Failed to fetch weekly statistics',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión al obtener estadísticas semanales',
      };
    }
  }

  /**
   * Gets a specific analysis by its unique identifier
   * @param analysisId - The unique ID of the analysis to retrieve
   * @returns Promise with the analysis result
   */
  async getAnalysisById(
    analysisId: number
  ): Promise<ApiResponse<AnalysisResult>> {
    try {
      const response = await httpService.get<BackendAnalysisResponse>(
        `/api/analyses/${analysisId}`
      );

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          error: response.data?.message || 'Failed to fetch analysis',
        };
      }
    } catch {
      return {
        success: false,
        error: 'Error de conexión al obtener análisis',
      };
    }
  }
}

export const dashboardService = new DashboardService();
