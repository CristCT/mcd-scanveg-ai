import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboard.service';
import type {
  DashboardState,
  PaginationInfo,
  WeeklyAnalysisItem,
} from '../../../shared/types';

const initialState: DashboardState = {
  data: {
    statistics: null,
    recentAnalyses: [],
    dailyStats: [],
  },
  loading: {
    statistics: false,
    recentAnalyses: false,
    dailyStats: false,
  },
  error: {
    statistics: null,
    recentAnalyses: null,
    dailyStats: null,
  },
};

/**
 * Custom hook for managing dashboard state and data loading
 * Handles statistics, recent analyses, and daily stats with loading and error states
 * @returns Object containing state and functions for dashboard data management
 */
export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>(initialState);

  /**
   * Loads general dashboard statistics from the API
   */
  const loadStatistics = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, statistics: true },
      error: { ...prev.error, statistics: null },
    }));

    const statsResponse = await dashboardService.getStatistics();
    if (statsResponse.success) {
      setState(prev => ({
        ...prev,
        data: { ...prev.data, statistics: statsResponse.data || null },
        loading: { ...prev.loading, statistics: false },
      }));
    } else {
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, statistics: false },
        error: {
          ...prev.error,
          statistics: statsResponse.error || 'Failed to load statistics',
        },
      }));
    }
  }, []);

  /**
   * Loads recent analyses with pagination
   * @param currentPage - Current page number
   * @param pageSize - Number of items per page
   * @param setPagination - Function to update pagination state
   */
  const loadRecentAnalyses = useCallback(
    async (
      currentPage: number,
      pageSize: number,
      setPagination: (pagination: PaginationInfo | undefined) => void
    ) => {
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, recentAnalyses: true },
        error: { ...prev.error, recentAnalyses: null },
      }));

      const analysesResponse = await dashboardService.getRecentAnalyses(
        currentPage,
        pageSize
      );

      if (analysesResponse.success) {
        setState(prev => ({
          ...prev,
          data: {
            ...prev.data,
            recentAnalyses: analysesResponse.data?.analyses || [],
          },
          loading: { ...prev.loading, recentAnalyses: false },
        }));

        setPagination(analysesResponse.data?.pagination);
      } else {
        setState(prev => ({
          ...prev,
          loading: { ...prev.loading, recentAnalyses: false },
          error: {
            ...prev.error,
            recentAnalyses:
              analysesResponse.error || 'Failed to load recent analyses',
          },
        }));
      }
    },
    []
  );

  /**
   * Updates the daily stats in the dashboard state
   * @param dailyStats - Array of weekly analysis items
   */
  const setDailyStats = useCallback((dailyStats: WeeklyAnalysisItem[]) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, dailyStats },
    }));
  }, []);

  /**
   * Updates the loading state for daily stats
   * @param loading - Loading state boolean
   */
  const setDailyStatsLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, dailyStats: loading },
    }));
  }, []);

  /**
   * Updates the error state for daily stats
   * @param error - Error message or null
   */
  const setDailyStatsError = useCallback((error: string | null) => {
    setState(prev => ({
      ...prev,
      error: { ...prev.error, dailyStats: error },
    }));
  }, []);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  return {
    state,
    loadStatistics,
    loadRecentAnalyses,
    setDailyStats,
    setDailyStatsLoading,
    setDailyStatsError,
  };
};
