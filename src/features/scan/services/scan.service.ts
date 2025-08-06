import { httpService } from '../../../shared/services';
import type { ScanResultData, ScanRequest } from '../types';
import type { ApiResponse } from '../../../shared/types';

class ScanService {
  async scanImage(request: ScanRequest): Promise<ApiResponse<ScanResultData>> {
    const formData = new FormData();
    formData.append('image', request.image);

    return httpService.postFormData<ScanResultData>('/api/scan', formData);
  }
}

export const scanService = new ScanService();
