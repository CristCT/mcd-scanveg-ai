import { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Grid,
  Text,
  VStack,
  Alert,
} from '@chakra-ui/react';
import { BarChart3, Calendar, Target, Heart } from 'lucide-react';
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
  useDashboard,
  useWeeklyStats,
} from '../features/dashboard';

const DashboardPage: React.FC = () => {
  const { currentPage, pageSize, pagination, setCurrentPage, setPagination } =
    usePagination({ initialPage: 1, initialPageSize: 10 });

  const {
    state,
    loadRecentAnalyses,
    setDailyStats,
    setDailyStatsLoading,
    setDailyStatsError,
  } = useDashboard();

  const {
    currentPage: weeklyPage,
    data: weeklyData,
    loadWeeklyStats,
    handlePageChange: handleWeeklyPageChange,
  } = useWeeklyStats();

  const { data, loading, error } = state;
  const stats = data.statistics;

  useEffect(() => {
    loadRecentAnalyses(currentPage, pageSize, setPagination);
  }, [loadRecentAnalyses, currentPage, pageSize, setPagination]);

  useEffect(() => {
    loadWeeklyStats(setDailyStats, setDailyStatsLoading, setDailyStatsError);
  }, [
    loadWeeklyStats,
    setDailyStats,
    setDailyStatsLoading,
    setDailyStatsError,
  ]);

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
              icon={<BarChart3 />}
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
              icon={<Calendar />}
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
              icon={<Target />}
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
              icon={<Heart />}
            />
          </Grid>

          <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6}>
            <WeeklyAnalysisCard
              title="Análisis Semanal"
              weeklyData={data.dailyStats}
              formatDayName={formatDayName}
              loading={loading.dailyStats}
              error={error.dailyStats}
              currentPage={weeklyPage}
              onPageChange={handleWeeklyPageChange}
              startDate={weeklyData.start_date}
              endDate={weeklyData.end_date}
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
            onPageChange={setCurrentPage}
          />
        </VStack>
      </Container>
    </Layout>
  );
};

export { DashboardPage };
