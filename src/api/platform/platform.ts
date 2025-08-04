import { apiRequest } from '../api';
import type { ApiResponse } from '@/types/common/api-response';
import type { PlatformProps } from '@/types/api/platform';

const getPlatforms = async (): Promise<ApiResponse<PlatformProps[]>> => {
  return apiRequest<PlatformProps[]>({
    method: 'GET',
    url: '/platforms',
  });
};

export { getPlatforms };
