import { apiRequest } from '@/api/api';
import type { UserInfoResponse } from '@/types/api/users';
import type { ApiResponse } from '@/types/common/api-response';

const getUserInfo = async (): Promise<ApiResponse<UserInfoResponse>> => {
  return apiRequest<UserInfoResponse>({
    method: 'GET',
    url: '/users/me',
  });
};

export { getUserInfo };
