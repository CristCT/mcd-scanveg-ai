import type { AnalysisResult, RecentAnalysesResponse } from '../../../shared';

/**
 * Interface for backend analysis item structure
 */
export interface BackendAnalysisItem {
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

/**
 * Interface for backend statistics API response
 */
export interface BackendStatisticsResponse {
  success: boolean;
  data: {
    total_analyses: number;
    healthy_plants: number;
    diseased_plants: number;
    most_common_disease: string;
  };
  message: string;
}

/**
 * Interface for backend recent analyses API response
 */
export interface BackendRecentAnalysesResponse {
  success: boolean;
  data: RecentAnalysesResponse;
  message: string;
}

/**
 * Interface for backend diseases distribution API response
 */
export interface BackendDiseasesDistributionResponse {
  success: boolean;
  data: {
    diseases: Array<{
      name: string;
      count: number;
    }>;
  };
  message: string;
}

/**
 * Interface for backend weekly statistics API response
 */
export interface BackendWeekStatsResponse {
  success: boolean;
  data: {
    dailyAnalysis: Array<{
      date: string;
      total: number;
      healthy: number;
      diseased: number;
    }>;
    start_date: string;
    end_date: string;
  };
  message: string;
}

/**
 * Interface for backend single analysis API response
 */
export interface BackendAnalysisResponse {
  success: boolean;
  data: AnalysisResult;
  message: string;
}
