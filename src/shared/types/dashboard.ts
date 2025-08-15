export interface Statistics {
  totalAnalysis: number;
  todayAnalysis: number;
  averageConfidence: number;
  healthyTomatoes: number;
  diseases: DiseaseDistribution[];
}

export interface DiseaseDistribution {
  name: string;
  count: number;
  color: string;
}

export interface AnalysisResult {
  id: number;
  image_filename?: string;
  image_size?: string;
  image_format?: string;
  disease: string;
  confidence: number;
  status: 'healthy' | 'diseased';
  processing_time?: number;
  model_version?: string;
  date: string;
  created_at: string;
  updated_at: string;
  raw_predictions?: string;
  error_message?: string;
  success: boolean;
}

export interface RecentAnalysesResponse {
  analyses: AnalysisResult[];
  total: number;
}

export interface DailyAnalysisItem {
  day: number;
  count: number;
  date: string;
}

export interface DailyStatsResponse {
  dailyAnalysis: DailyAnalysisItem[];
  period_days: number;
}

export interface DashboardData {
  statistics: Statistics | null;
  recentAnalyses: AnalysisResult[];
  dailyStats: DailyAnalysisItem[];
}

export interface DashboardState {
  data: DashboardData;
  loading: {
    statistics: boolean;
    recentAnalyses: boolean;
    dailyStats: boolean;
  };
  error: {
    statistics: string | null;
    recentAnalyses: string | null;
    dailyStats: string | null;
  };
}
