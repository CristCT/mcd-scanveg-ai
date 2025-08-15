import { useState, useEffect, useCallback } from 'react';
import { pingService } from '../services';

interface ServerStatus {
  isOnline: boolean;
  isLoading: boolean;
  lastChecked: Date | null;
  service?: string;
}

interface UseServerStatusOptions {
  interval?: number;
  enabled?: boolean;
}

export const useServerStatus = (options: UseServerStatusOptions = {}) => {
  const { interval = 30000, enabled = true } = options;

  const [status, setStatus] = useState<ServerStatus>({
    isOnline: false,
    isLoading: true,
    lastChecked: null,
  });

  const checkServerStatus = useCallback(async () => {
    if (!enabled) return;

    setStatus(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await pingService.ping();

      setStatus({
        isOnline: result.isOnline,
        isLoading: false,
        lastChecked: new Date(),
        service: result.data?.service,
      });
    } catch {
      setStatus({
        isOnline: false,
        isLoading: false,
        lastChecked: new Date(),
      });
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled) {
      checkServerStatus();
    }
  }, [checkServerStatus, enabled]);

  useEffect(() => {
    if (!enabled || interval <= 0) return;

    const intervalId = setInterval(checkServerStatus, interval);

    return () => clearInterval(intervalId);
  }, [checkServerStatus, interval, enabled]);

  return {
    ...status,
    refresh: checkServerStatus,
  };
};
