import type { ApiResponse } from '../../../shared/types';
import type {
  Statistics,
  DailyStatsResponse,
  AnalysisResult,
  PaginationInfo,
} from '../../../shared/types';
import {
  getStatistics,
  getRecentAnalyses,
  getWeekStats,
  getAnalysisById,
} from './methods';

/**
 * Dashboard Service Class
 *
 * Handles all dashboard-related API calls and data transformations.
 * Provides methods for retrieving statistics, analyses, and weekly data.
 *
 * @class DashboardService
 */
class DashboardService {
  /**
   * Gets the general dashboard statistics
   * @returns Promise with statistics data
   */
  async getStatistics(): Promise<ApiResponse<Statistics>> {
    return getStatistics();
  }

  /**
   * Gets recent analyses with pagination
   * @param page - Page number (default: 1)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise with analyses and pagination information
   */
  async getRecentAnalyses(
    page?: number,
    pageSize?: number
  ): Promise<
    ApiResponse<{ analyses: AnalysisResult[]; pagination: PaginationInfo }>
  > {
    return getRecentAnalyses(page, pageSize);
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
    return getWeekStats(weekStart, weekEnd);
  }

  /**
   * Gets a specific analysis by its unique identifier
   * @param analysisId - The unique ID of the analysis to retrieve
   * @returns Promise with the analysis result
   */
  async getAnalysisById(
    analysisId: number
  ): Promise<ApiResponse<AnalysisResult>> {
    return getAnalysisById(analysisId);
  }
}

/**
 * Singleton instance of the DashboardService
 * Export this instance to be used across the application
 */
export const dashboardService = new DashboardService();
