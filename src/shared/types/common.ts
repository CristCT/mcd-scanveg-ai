/**
 * Generic API response interface for all HTTP requests
 * @template T - Type of the response data
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Interface for managing loading states in components
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/** Available button style variants */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

/** Available button sizes */
export type ButtonSize = 'sm' | 'md' | 'lg';
