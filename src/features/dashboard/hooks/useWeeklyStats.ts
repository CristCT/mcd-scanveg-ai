import { useState, useCallback, useRef } from 'react';
import { dashboardService } from '../services/dashboard.service';
import { addDays, formatYMDLocal, getMondayOfCurrentWeek } from '../utils';
import type { WeeklyAnalysisItem } from '../../../shared/types';

interface WeeklyStatsData {
  analyses: WeeklyAnalysisItem[];
  start_date: string;
  end_date: string;
}

export const useWeeklyStats = () => {
  const baseDateRef = useRef<Date>(getMondayOfCurrentWeek(new Date()));
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<WeeklyStatsData>({
    analyses: [],
    start_date: '',
    end_date: '',
  });

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
          start_date: weekResponse.data?.start_date || weekStart,
          end_date: weekResponse.data?.end_date || weekEnd,
        });
      } else {
        setLoading(false);
        setError(
          weekResponse.error || 'Error al cargar estadísticas semanales'
        );
      }
    },
    [currentPage]
  );

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
