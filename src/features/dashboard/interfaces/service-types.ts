/**
 * Interface for disease color mapping
 */
export interface DiseaseColorMap {
  [key: string]: string;
}

/**
 * Interface for daily analysis data used internally
 */
export interface DailyAnalysisData {
  date: string;
  total: number;
  healthy: number;
  diseased: number;
}

/**
 * Interface for day mapping used in week statistics processing
 */
export interface DayInfo {
  day: number;
  count: number;
  date: string;
}

/**
 * Interface for internal data processing
 */
export interface DateParts {
  year: number;
  month: number;
  day: number;
}

/**
 * Interface for statistics calculation
 */
export interface CalculatedStats {
  todayCount: number;
  totalConfidence: number;
  analysisCount: number;
}
