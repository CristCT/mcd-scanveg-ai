import { useState, useCallback, useRef } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { addDays, formatYMDLocal, getMondayOfCurrentWeek } from '../utils';
import type { WeeklyAnalysisItem } from '../../../shared/types';

/**
 * Interface for weekly statistics data structure
 */
interface WeeklyStatsData {
  analyses: WeeklyAnalysisItem[];
  start_date: string;
  end_date: string;
}

/**
 * Custom hook for managing weekly statistics with pagination
 * Handles loading weekly analysis data starting from Monday of each week
 * @returns Object containing current page, data, and functions for weekly stats management
 */
export const useWeeklyStats = () => {
  const baseDateRef = useRef<Date>(getMondayOfCurrentWeek(new Date()));
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<WeeklyStatsData>({
    analyses: [],
    start_date: '',
    end_date: '',
  });

  /**
   * Loads weekly statistics for the current page
   * @param setDailyStats - Function to update daily stats in parent component
   * @param setLoading - Function to update loading state in parent component
   * @param setError - Function to update error state in parent component
   */
  const loadWeeklyStats = useCallback(
    async (
      setDailyStats: (stats: WeeklyAnalysisItem[]) => void,
      setLoading: (loading: boolean) => void,
      setError: (error: string | null) => void
    ) => {
      setLoading(true);
      setError(null);

      const startDate = addDays(baseDateRef.current, currentPage * 7);
      const endDate = addDays(startDate, 6);

      const weekStart = formatYMDLocal(startDate);
      const weekEnd = formatYMDLocal(endDate);

      const weekResponse = await dashboardService.getWeekStats(
        weekStart,
        weekEnd
      );

      if (weekResponse.success) {
        const weeklyData = weekResponse.data?.dailyAnalysis || [];
        setDailyStats(weeklyData);
        setLoading(false);

        setData({
          analyses: weeklyData,
          start_date: weekStart,
          end_date: weekEnd,
        });
      } else {
        if (
          weekResponse.data &&
          Array.isArray(weekResponse.data.dailyAnalysis)
        ) {
          const weeklyData = weekResponse.data.dailyAnalysis;
          setDailyStats(weeklyData);
          setLoading(false);

          setData({
            analyses: weeklyData,
            start_date: weekStart,
            end_date: weekEnd,
          });
        } else {
          setLoading(false);
          setError(weekResponse.error || 'Failed to load weekly statistics');
        }
      }
    },
    [currentPage]
  );

  /**
   * Handles pagination for weekly statistics
   * @param direction - Direction to navigate ('prev' for previous week, 'next' for next week)
   */
  const handlePageChange = useCallback((direction: 'prev' | 'next') => {
    setCurrentPage(prev => (direction === 'next' ? prev + 1 : prev - 1));
  }, []);

  return {
    currentPage,
    data,
    loadWeeklyStats,
    handlePageChange,
  };
};
