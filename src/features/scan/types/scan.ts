export interface ScanResultData {
  prediction: 'healthy' | 'diseased';
  confidence: number;
  disease?: string;
  details?: string;
  processedAt: string;
}

export interface ScanRequest {
  image: File;
}

export interface ScanState {
  result: ScanResultData | null;
  isLoading: boolean;
  error: string | null;
}
