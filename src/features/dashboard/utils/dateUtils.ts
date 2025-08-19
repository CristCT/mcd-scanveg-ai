/**
 * Sets the time of a date to the start of the day (00:00:00.000)
 * @param d - The date to modify
 * @returns A new Date object with time set to start of day
 */
export const startOfLocalDay = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

/**
 * Adds a specified number of days to a date
 * @param d - The base date
 * @param days - Number of days to add (can be negative to subtract)
 * @returns A new Date object with the specified days added
 */
export const addDays = (d: Date, days: number): Date => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

/**
 * Formats a date to YYYY-MM-DD format in local time
 * @param d - The date to format
 * @returns Date string in YYYY-MM-DD format
 */
export const formatYMDLocal = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};

/**
 * Gets the Monday of the current week for a given date
 * @param date - The reference date
 * @returns A new Date object representing the Monday of the week containing the given date
 */
export const getMondayOfCurrentWeek = (date: Date): Date => {
  const d = startOfLocalDay(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

/**
 * Formats a date string from YYYY-MM-DD to DD/MM/YYYY format
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Formatted date string in DD/MM/YYYY format or empty string if invalid
 */
export const formatDateToDDMMYYYY = (dateStr: string): string => {
  if (!dateStr || typeof dateStr !== 'string') {
    return '';
  }

  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${day}/${month}/${year}`;
  }

  return '';
};

/**
 * Formats a date range from start and end date strings
 * @param startDate - Start date string in YYYY-MM-DD format
 * @param endDate - End date string in YYYY-MM-DD format
 * @returns Formatted date range string or empty string if invalid
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  const formattedStart = formatDateToDDMMYYYY(startDate);
  const formattedEnd = formatDateToDDMMYYYY(endDate);

  if (!formattedStart || !formattedEnd) {
    return '';
  }

  return `${formattedStart} - ${formattedEnd}`;
};
