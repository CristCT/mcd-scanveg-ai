export {
  StatisticsCard,
  DiseaseDistributionCard,
  WeeklyAnalysisCard,
  HealthStatusCard,
  RecentAnalysesCard,
} from './components';

export type {
  Statistics,
  DiseaseDistribution,
  AnalysisResult,
  RecentAnalysesResponse,
  WeeklyAnalysisItem,
  DailyStatsResponse,
  DashboardData,
  DashboardState,
  PaginationInfo,
} from '../../shared/types';

export { dashboardService } from './services';

export {
  startOfLocalDay,
  addDays,
  formatYMDLocal,
  getMondayOfCurrentWeek,
  formatDisplayDate,
} from './utils';

export { useDashboard, useWeeklyStats } from './hooks';

export type {
  BackendAnalysisItem,
  BackendStatisticsResponse,
  BackendRecentAnalysesResponse,
  BackendDiseasesDistributionResponse,
  BackendWeekStatsResponse,
  BackendAnalysisResponse,
  DiseaseColorMap,
  DailyAnalysisData,
  DayInfo,
  DateParts,
  CalculatedStats,
  WeekStatsParams,
  RecentAnalysesParams,
  AnalysisByIdParams,
} from './interfaces';

export {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE,
  DEFAULT_RECENT_ANALYSES_SIZE,
  DASHBOARD_ERRORS,
  DASHBOARD_ENDPOINTS,
} from './constants';
