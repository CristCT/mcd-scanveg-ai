/**
 * Interface for scan result data returned from the API
 */
export interface ScanResultData {
  prediction: 'healthy' | 'diseased';
  confidence: number;
  disease?: string;
  details?: string;
  processedAt: string;
}

/**
 * Interface for scan request payload
 */
export interface ScanRequest {
  image: File;
}

/**
 * Interface for scan hook state management
 */
export interface ScanState {
  result: ScanResultData | null;
  isLoading: boolean;
  error: string | null;
}
