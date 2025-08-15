import React, { useState, useEffect } from 'react';
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
  DailyAnalysisCard,
  HealthStatusCard,
  RecentAnalysesCard,
  dashboardService,
} from '../features/dashboard';
import type { DashboardState } from '../features/dashboard';

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

  useEffect(() => {
    loadDashboardData();
  }, []);

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

    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, recentAnalyses: true },
      error: { ...prev.error, recentAnalyses: null },
    }));

    const analysesResponse = await dashboardService.getRecentAnalyses(10);
    if (analysesResponse.success) {
      setState(prev => ({
        ...prev,
        data: { ...prev.data, recentAnalyses: analysesResponse.data || [] },
        loading: { ...prev.loading, recentAnalyses: false },
      }));
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

    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, dailyStats: true },
      error: { ...prev.error, dailyStats: null },
    }));

    const dailyResponse = await dashboardService.getDailyStats(7);
    if (dailyResponse.success) {
      setState(prev => ({
        ...prev,
        data: {
          ...prev.data,
          dailyStats: dailyResponse.data?.dailyAnalysis || [],
        },
        loading: { ...prev.loading, dailyStats: false },
      }));
    } else {
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, dailyStats: false },
        error: {
          ...prev.error,
          dailyStats:
            dailyResponse.error || 'Error al cargar estadísticas diarias',
        },
      }));
    }
  };

  const { data, loading, error } = state;
  const stats = data.statistics;

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
              label="Total Análisis"
              value={
                loading.statistics
                  ? undefined
                  : (stats?.totalAnalysis || 0).toLocaleString()
              }
              helpText="Histórico"
              loading={loading.statistics}
            />
            <StatisticsCard
              label="Análisis Hoy"
              value={
                loading.statistics
                  ? undefined
                  : (stats?.todayAnalysis || 0).toString()
              }
              helpText="Hoy"
              loading={loading.statistics}
            />
            <StatisticsCard
              label="Confianza Promedio"
              value={
                loading.statistics
                  ? undefined
                  : `${stats?.averageConfidence || 0}%`
              }
              helpText="Promedio"
              loading={loading.statistics}
            />
            <StatisticsCard
              label="Tomates Saludables"
              value={
                loading.statistics
                  ? undefined
                  : `${stats?.healthyTomatoes || 0}%`
              }
              helpText="Saludables"
              loading={loading.statistics}
            />
          </Grid>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6}>
            <DailyAnalysisCard
              title="Análisis por Día"
              dailyData={data.dailyStats}
              formatDayName={formatDayName}
              loading={loading.dailyStats}
              error={error.dailyStats}
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
          />
        </VStack>
      </Container>
    </Layout>
  );
};

export { DashboardPage };
