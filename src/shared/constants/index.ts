/**
 * Constants for disease color themes
 */
const DISEASE_COLORS = {
  HEALTHY: 'green.500',
  LATE_BLIGHT: 'red.500',
  EARLY_BLIGHT: 'orange.500',
  MOSAIC_VIRUS: 'purple.500',
  BACTERIAL_SPOT: 'yellow.600',
  LEAF_MOLD: 'blue.500',
  SEPTORIA_LEAF_SPOT: 'pink.500',
  SPIDER_MITES: 'teal.500',
  TARGET_SPOT: 'cyan.500',
  YELLOW_LEAF_CURL: 'lime.500',
  DEFAULT: 'gray.500',
} as const;

/**
 * Constants for week days mapping
 */
const WEEK_DAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

export { DISEASE_COLORS, WEEK_DAYS };
