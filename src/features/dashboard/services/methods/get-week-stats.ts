import { httpService } from '../../../../shared/services/http.service';
import type { ApiResponse, DailyStatsResponse } from '../../../../shared/types';
import { WEEK_DAYS } from '../../../../shared/constants';
import { DASHBOARD_ERRORS, DASHBOARD_ENDPOINTS } from '../../constants';
import type {
  BackendWeekStatsResponse,
  DailyAnalysisData,
  DayInfo,
  DateParts,
} from '../../interfaces';

/**
 * Gets the week statistics for a specified date range
 * @param weekStart - Start date in YYYY-MM-DD format
 * @param weekEnd - End date in YYYY-MM-DD format
 * @returns Promise with daily statistics response
 */
export async function getWeekStats(
  weekStart: string,
  weekEnd: string
): Promise<ApiResponse<DailyStatsResponse>> {
  try {
    const response = await httpService.get<BackendWeekStatsResponse>(
      `${DASHBOARD_ENDPOINTS.WEEK_STATS}?week_start=${weekStart}&week_end=${weekEnd}`
    );

    if (response.success && response.data?.data) {
      const dailyAnalysisData: DailyAnalysisData[] =
        response.data.data.dailyAnalysis || [];

      const startDateParts = weekStart.split('-');
      const dateParts: DateParts = {
        year: parseInt(startDateParts[0]),
        month: parseInt(startDateParts[1]) - 1,
        day: parseInt(startDateParts[2]),
      };
      const startDate = new Date(
        dateParts.year,
        dateParts.month,
        dateParts.day
      );
      const allDaysMap = new Map<number, DayInfo>();

      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dayOfWeek = date.getDay();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        const dayData = dailyAnalysisData.find(
          item => item.date === dateString
        );

        const dayInfo: DayInfo = {
          day: dayOfWeek,
          count: dayData ? dayData.total : 0,
          date: dateString,
        };

        allDaysMap.set(dayOfWeek, dayInfo);
      }

      const orderedDays: DayInfo[] = [];

      for (let i = WEEK_DAYS.MONDAY; i <= WEEK_DAYS.SATURDAY; i++) {
        if (allDaysMap.has(i)) {
          orderedDays.push(allDaysMap.get(i)!);
        }
      }
      if (allDaysMap.has(WEEK_DAYS.SUNDAY)) {
        orderedDays.push(allDaysMap.get(WEEK_DAYS.SUNDAY)!);
      }

      const transformedData: DailyStatsResponse = {
        dailyAnalysis: orderedDays,
        start_date: response.data.data.start_date,
        end_date: response.data.data.end_date,
      };

      return {
        success: true,
        data: transformedData,
      };
    } else {
      return {
        success: false,
        error:
          response.data?.message || DASHBOARD_ERRORS.WEEKLY_STATS_FETCH_FAILED,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: DASHBOARD_ERRORS.CONNECTION_ERROR_WEEKLY_STATS,
    };
  }
}
