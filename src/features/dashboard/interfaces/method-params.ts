/**
 * Interface for getWeekStats method parameters
 */
export interface WeekStatsParams {
  weekStart: string;
  weekEnd: string;
}

/**
 * Interface for getRecentAnalyses method parameters
 */
export interface RecentAnalysesParams {
  page?: number;
  pageSize?: number;
}

/**
 * Interface for getAnalysisById method parameters
 */
export interface AnalysisByIdParams {
  analysisId: number;
}
