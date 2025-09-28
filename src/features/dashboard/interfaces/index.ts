import type { AnalysisResult, RecentAnalysesResponse } from '../../../shared';

/**
 * Interface for backend analysis item structure
 */
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

/**
 * Interface for backend statistics API response
 */
interface BackendStatisticsResponse {
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
interface BackendRecentAnalysesResponse {
  success: boolean;
  data: RecentAnalysesResponse;
  message: string;
}

/**
 * Interface for backend diseases distribution API response
 */
interface BackendDiseasesDistributionResponse {
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
interface BackendWeekStatsResponse {
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
interface BackendAnalysisResponse {
  success: boolean;
  data: AnalysisResult;
  message: string;
}

// =============================================================================
// SERVICE INTERFACES
// =============================================================================

/**
 * Interface for disease color mapping
 */
interface DiseaseColorMap {
  [key: string]: string;
}

/**
 * Interface for daily analysis data used internally
 */
interface DailyAnalysisData {
  date: string;
  total: number;
  healthy: number;
  diseased: number;
}

/**
 * Interface for day mapping used in week statistics processing
 */
interface DayInfo {
  day: number;
  count: number;
  date: string;
}

/**
 * Interface for internal data processing
 */
interface DateParts {
  year: number;
  month: number;
  day: number;
}

/**
 * Interface for statistics calculation
 */
interface CalculatedStats {
  todayCount: number;
  totalConfidence: number;
  analysisCount: number;
}

export type {
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
};
