export {
  StatisticsCard,
  DiseaseDistributionCard,
  DailyAnalysisCard,
  HealthStatusCard,
  RecentAnalysesCard,
} from './components';
export type {
  Statistics,
  DiseaseDistribution,
  AnalysisResult,
  RecentAnalysesResponse,
  DailyAnalysisItem,
  DailyStatsResponse,
  DashboardData,
  DashboardState,
  PaginationInfo,
} from '../../shared/types';

export { dashboardService } from './services/dashboard.service';
