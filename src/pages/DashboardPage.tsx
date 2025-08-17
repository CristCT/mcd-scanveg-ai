import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  Grid,
  Text,
  VStack,
  Alert,
} from '@chakra-ui/react';
import { Layout } from '../shared/components/Layout';
import { usePagination } from '../shared/hooks';
import {
  formatDiseaseName,
  formatDayName,
  translateStatus,
  getConfianzaColor,
  formatAnalysisDate,
} from '../shared/utils';
import {
  StatisticsCard,
  DiseaseDistributionCard,
  WeeklyAnalysisCard,
  HealthStatusCard,
  RecentAnalysesCard,
  dashboardService,
  addDays,
  formatYMDLocal,
  getMondayOfCurrentWeek,
} from '../features/dashboard';
import type { DashboardState } from '../features/dashboard';
import type { WeeklyAnalysisItem } from '../shared/types';

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

const DashboardPage: React.FC = () => {
  const [state, setState] = useState<DashboardState>(initialState);
  const { currentPage, pageSize, pagination, setCurrentPage, setPagination } =
    usePagination({ initialPage: 1, initialPageSize: 10 });

  const baseDateRef = React.useRef<Date>(getMondayOfCurrentWeek(new Date()));

  const [dailyStatsPage, setDailyStatsPage] = useState(0);
  const [dailyStatsData, setDailyStatsData] = useState<{
    analyses: WeeklyAnalysisItem[];
    start_date: string;
    end_date: string;
  }>({ analyses: [], start_date: '', end_date: '' });
  const { data, loading, error } = state;
  const stats = data.statistics;

  const loadRecentAnalyses = useCallback(async () => {
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
          recentAnalyses: analysesResponse.error || 'Error al cargar análisis',
        },
      }));
    }
  }, [currentPage, pageSize, setPagination]);

  const loadDailyStats = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, dailyStats: true },
      error: { ...prev.error, dailyStats: null },
    }));

    const startDate = addDays(baseDateRef.current, dailyStatsPage * 7);
    const endDate = addDays(startDate, 6);

    const weekStart = formatYMDLocal(startDate);
    const weekEnd = formatYMDLocal(endDate);

    const weekResponse = await dashboardService.getWeekStats(
      weekStart,
      weekEnd
    );

    if (weekResponse.success) {
      setState(prev => ({
        ...prev,
        data: {
          ...prev.data,
          dailyStats: weekResponse.data?.dailyAnalysis || [],
        },
        loading: { ...prev.loading, dailyStats: false },
      }));

      setDailyStatsData({
        analyses: weekResponse.data?.dailyAnalysis || [],
        start_date: weekResponse.data?.start_date || weekStart,
        end_date: weekResponse.data?.end_date || weekEnd,
      });
    } else {
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, dailyStats: false },
        error: {
          ...prev.error,
          dailyStats:
            weekResponse.error || 'Error al cargar estadísticas semanales',
        },
      }));
    }
  }, [dailyStatsPage]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    loadRecentAnalyses();
  }, [loadRecentAnalyses]);

  useEffect(() => {
    loadDailyStats();
  }, [loadDailyStats]);

  const loadDashboardData = async () => {
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
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDailyStatsPageChange = (direction: 'prev' | 'next') => {
    setDailyStatsPage(prev => (direction === 'next' ? prev + 1 : prev - 1));
  };

  return (
    <Layout>
      <Container maxW="100%" py={8} px={6}>
        <VStack gap={8} align="stretch" w="full">
          <Box textAlign="center">
            <Heading size="xl" mb={2}>
              Dashboard de Análisis de Tomates
            </Heading>
            <Text color="gray.600">
              Resumen de análisis de enfermedades en tomates y estadísticas en
              tiempo real
            </Text>
          </Box>

          {error.statistics && (
            <Alert.Root status="error" mb={6}>
              <Alert.Indicator />
              <Alert.Title>Error al cargar estadísticas</Alert.Title>
              <Alert.Description>{error.statistics}</Alert.Description>
            </Alert.Root>
          )}

          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6}>
            <StatisticsCard
              label="Análisis Históricos"
              value={
                loading.statistics
                  ? undefined
                  : (stats?.totalAnalysis || 0).toLocaleString()
              }
              helpText=""
              loading={loading.statistics}
            />
            <StatisticsCard
              label="Análisis de Hoy"
              value={
                loading.statistics
                  ? undefined
                  : (stats?.todayAnalysis || 0).toString()
              }
              helpText=""
              loading={loading.statistics}
            />
            <StatisticsCard
              label="Nivel Promedio de Confianza"
              value={
                loading.statistics
                  ? undefined
                  : `${stats?.averageConfidence || 0}%`
              }
              helpText=""
              loading={loading.statistics}
            />
            <StatisticsCard
              label="Tomates Saludables"
              value={
                loading.statistics
                  ? undefined
                  : `${stats?.healthyTomatoes || 0}%`
              }
              helpText=""
              loading={loading.statistics}
            />
          </Grid>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6}>
            <WeeklyAnalysisCard
              title="Análisis por Semana"
              weeklyData={data.dailyStats}
              formatDayName={formatDayName}
              loading={loading.dailyStats}
              error={error.dailyStats}
              currentPage={dailyStatsPage}
              onPageChange={handleDailyStatsPageChange}
              startDate={dailyStatsData.start_date}
              endDate={dailyStatsData.end_date}
            />
            <DiseaseDistributionCard
              title="Enfermedades Detectadas"
              diseases={stats?.diseases || []}
              formatDiseaseName={formatDiseaseName}
              loading={loading.statistics}
              error={error.statistics}
            />
            <HealthStatusCard
              title="Estado de Salud"
              healthyPercentage={stats?.healthyTomatoes || 0}
              loading={loading.statistics}
              hasData={!!stats && stats.totalAnalysis > 0}
              error={error.statistics}
            />
          </Grid>

          <RecentAnalysesCard
            title="Análisis Recientes"
            analyses={data.recentAnalyses}
            loading={loading.recentAnalyses}
            error={error.recentAnalyses}
            formatDiseaseName={formatDiseaseName}
            translateStatus={translateStatus}
            getConfianzaColor={getConfianzaColor}
            formatAnalysisDate={formatAnalysisDate}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </VStack>
      </Container>
    </Layout>
  );
};

export { DashboardPage };
