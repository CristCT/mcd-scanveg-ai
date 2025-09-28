/**
 * Default values for dashboard service methods
 */
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;
export const DEFAULT_RECENT_ANALYSES_SIZE = 100;

/**
 * Error messages for dashboard service
 */
export const DASHBOARD_ERRORS = {
  STATISTICS_FETCH_FAILED: 'Failed to fetch statistics',
  RECENT_ANALYSES_FETCH_FAILED: 'Failed to fetch recent analyses',
  WEEKLY_STATS_FETCH_FAILED: 'Failed to fetch weekly statistics',
  ANALYSIS_FETCH_FAILED: 'Failed to fetch analysis',
  CONNECTION_ERROR_STATISTICS: 'Error de conexión al obtener estadísticas',
  CONNECTION_ERROR_RECENT_ANALYSES:
    'Error de conexión al obtener análisis recientes',
  CONNECTION_ERROR_WEEKLY_STATS:
    'Error de conexión al obtener estadísticas semanales',
  CONNECTION_ERROR_ANALYSIS: 'Error de conexión al obtener análisis',
} as const;

/**
 * API endpoints for dashboard service
 */
export const DASHBOARD_ENDPOINTS = {
  STATISTICS: '/api/statistics',
  RECENT_ANALYSES: '/api/analyses/recent',
  DISEASES_DISTRIBUTION: '/api/diseases/distribution',
  WEEK_STATS: '/api/analyses/week-stats',
  ANALYSIS_BY_ID: '/api/analyses',
} as const;
