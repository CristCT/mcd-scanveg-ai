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
 * Formats a date string to DD/MM/YYYY format for display
 * Handles both YYYY-MM-DD and DD-MM-YYYY input formats
 * @param dateString - The date string to format
 * @returns Date string in DD/MM/YYYY format
 */
export const formatDisplayDate = (dateString: string): string => {
  if (!dateString) return '';

  if (dateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    return dateString;
  }

  if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) {
    const [day, month, year] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  } catch {
    return dateString;
  }

  return dateString;
};
