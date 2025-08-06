import { useState, useCallback } from 'react';
import { scanService } from '../services';
import type { ScanState, ScanRequest } from '../types';

export const useScan = () => {
  const [state, setState] = useState<ScanState>({
    result: null,
    isLoading: false,
    error: null,
  });

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
          error: response.error || 'Error desconocido al procesar la imagen',
        }));
      }
    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Error de conexión. Por favor, intenta de nuevo.',
      }));
    }
  }, []);

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
