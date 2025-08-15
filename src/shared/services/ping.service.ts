import { httpService } from './http.service';

interface PingResponse {
  status: string;
  service: string;
}

class PingService {
  async ping(): Promise<{ isOnline: boolean; data?: PingResponse }> {
    try {
      const response = await httpService.get<PingResponse>('/api/ping');

      if (response.success && response.data) {
        return {
          isOnline: true,
          data: response.data,
        };
      }

      return { isOnline: false };
    } catch (error) {
      console.warn('Server ping failed:', error);
      return { isOnline: false };
    }
  }
}

export const pingService = new PingService();
