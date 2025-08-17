import { useState, useCallback } from 'react';
import { scanService } from '../services';
import type { ScanState, ScanRequest } from '../types';

/**
 * Custom hook for managing image scanning state and operations
 * Handles scan requests, loading states, and error management
 * @returns Object containing scan state and functions for scanning operations
 */
export const useScan = () => {
  const [state, setState] = useState<ScanState>({
    result: null,
    isLoading: false,
    error: null,
  });

  /**
   * Scans an uploaded image for tomato diseases
   * @param request - The scan request containing the image file
   */
  const scanImage = useCallback(async (request: ScanRequest) => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await scanService.scanImage(request);

      if (response.success && response.data) {
        setState({
          result: response.data,
          isLoading: false,
          error: null,
        });
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.error || 'Unknown error processing image',
        }));
      }
    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Connection error. Please try again.',
      }));
    }
  }, []);

  /**
   * Resets the scan state to initial values
   */
  const reset = useCallback(() => {
    setState({
      result: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    scanImage,
    reset,
  };
};
