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

export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>(initialState);

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
          statistics: statsResponse.error || 'Error al cargar estadísticas',
        },
      }));
    }
  }, []);

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
              analysesResponse.error || 'Error al cargar análisis',
          },
        }));
      }
    },
    []
  );

  const setDailyStats = useCallback((dailyStats: WeeklyAnalysisItem[]) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, dailyStats },
    }));
  }, []);

  const setDailyStatsLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, dailyStats: loading },
    }));
  }, []);

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
