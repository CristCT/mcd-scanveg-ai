/**
 * Sets the time of a date to the start of the day (00:00:00.000)
 */
export const startOfLocalDay = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

/**
 * Adds a specified number of days to a date
 */
export const addDays = (d: Date, days: number): Date => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

/**
 * Formats a date to YYYY-MM-DD format in local time
 */
export const formatYMDLocal = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};

/**
 * Gets the Monday of the current week for a given date
 */
export const getMondayOfCurrentWeek = (date: Date): Date => {
  const d = startOfLocalDay(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};
