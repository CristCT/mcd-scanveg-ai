import { httpService } from '../../../shared/services/http.service';
import type { ApiResponse } from '../../../shared/types';
import type {
  Statistics,
  RecentAnalysesResponse,
  DailyStatsResponse,
  AnalysisResult,
  PaginationInfo,
  DiseaseDistribution,
} from '../../../shared/types';

interface BackendAnalysisItem {
  id: number;
  filename?: string;
  prediction?: string;
  confidence: number;
  status: 'healthy' | 'diseased';
  processing_time?: number;
  model_version?: string;
  created_at: string;
  updated_at: string;
  all_predictions?: Record<string, number>;
  error_message?: string;
  success?: boolean;
  image_info?: {
    mode?: string;
    size?: string;
    format?: string;
    filename?: string;
  };
}

class DashboardService {
  private getDiseaseColor(disease: string): string {
    const colorMap: Record<string, string> = {
      Tomato_healthy: 'green.500',
      Tomato_Late_blight: 'red.500',
      Tomato_Early_blight: 'orange.500',
      Tomato__Tomato_mosaic_virus: 'purple.500',
      Tomato_Bacterial_spot: 'yellow.600',
      Tomato_Leaf_Mold: 'blue.500',
      Tomato_Septoria_leaf_spot: 'pink.500',
      Tomato_Spider_mites_Two_spotted_spider_mite: 'teal.500',
      Tomato__Target_Spot: 'cyan.500',
      Tomato__Tomato_YellowLeaf__Curl_Virus: 'lime.500',
    };
    return colorMap[disease] || 'gray.500';
  }
  /**
   * Gets the general dashboard statistics
   */
  async getStatistics(): Promise<ApiResponse<Statistics>> {
    try {
      const response = await httpService.get<{
        success: boolean;
        data: {
          total_analyses: number;
          healthy_plants: number;
          diseased_plants: number;
          most_common_disease: string;
        };
        message: string;
      }>('/api/statistics');

      if (response.success && response.data) {
        const recentAnalysesResponse = await this.getRecentAnalyses(1, 100);
        let todayCount = 0;
        let totalConfidence = 0;
        let analysisCount = 0;

        if (recentAnalysesResponse.success && recentAnalysesResponse.data) {
          const today = new Date().toISOString().split('T')[0];

          recentAnalysesResponse.data.analyses.forEach(analysis => {
            const analysisDate = analysis.date.split('T')[0];
            if (analysisDate === today) {
              todayCount++;
            }

            totalConfidence += analysis.confidence;
            analysisCount++;
          });
        }

        const diseasesResponse = await httpService.get<{
          success: boolean;
          data: { diseases: Array<{ name: string; count: number }> };
          message: string;
        }>('/api/diseases/distribution');

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
          error: response.data?.message || 'Error al obtener estadísticas',
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
   */
  async getRecentAnalyses(
    page: number = 1,
    pageSize: number = 10
  ): Promise<
    ApiResponse<{ analyses: AnalysisResult[]; pagination: PaginationInfo }>
  > {
    try {
      const response = await httpService.get<{
        success: boolean;
        data: RecentAnalysesResponse;
        message: string;
      }>(`/api/analyses/recent?page=${page}&page_size=${pageSize}`);

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
            response.data?.message || 'Error al obtener análisis recientes',
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
   * Gets the daily statistics
   */
  async getDailyStats(
    days: number = 7
  ): Promise<ApiResponse<DailyStatsResponse>> {
    try {
      const response = await httpService.get<{
        success: boolean;
        data: {
          dailyAnalysis: Array<{
            date: string;
            total: number;
            healthy: number;
            diseased: number;
          }>;
          period_days: number;
        };
        message: string;
      }>(`/api/analyses/daily-stats?days=${days}`);

      if (response.success && response.data) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const allDaysMap = new Map<
          number,
          { day: number; count: number; date: string }
        >();

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dayOfWeek = date.getDay();

          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const dateString = `${year}-${month}-${day}`;

          const dayData = response.data.data.dailyAnalysis.find(
            item => item.date === dateString
          );

          allDaysMap.set(dayOfWeek, {
            day: dayOfWeek,
            count: dayData ? dayData.total : 0,
            date: dateString,
          });
        }

        const orderedDays: Array<{ day: number; count: number; date: string }> =
          [];
        for (let day = 1; day <= 6; day++) {
          if (allDaysMap.has(day)) {
            orderedDays.push(allDaysMap.get(day)!);
          }
        }
        if (allDaysMap.has(0)) {
          orderedDays.push(allDaysMap.get(0)!);
        }

        const transformedData: DailyStatsResponse = {
          dailyAnalysis: orderedDays,
          period_days: response.data.data.period_days,
        };

        return {
          success: true,
          data: transformedData,
        };
      } else {
        return {
          success: false,
          error:
            response.data?.message || 'Error al obtener estadísticas diarias',
        };
      }
    } catch {
      return {
        success: false,
        error: 'Error de conexión al obtener estadísticas diarias',
      };
    }
  }

  /**
   * Gets a specific analysis by ID
   */
  async getAnalysisById(
    analysisId: number
  ): Promise<ApiResponse<AnalysisResult>> {
    try {
      const response = await httpService.get<{
        success: boolean;
        data: AnalysisResult;
        message: string;
      }>(`/api/analyses/${analysisId}`);

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          error: response.data?.message || 'Error al obtener análisis',
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
