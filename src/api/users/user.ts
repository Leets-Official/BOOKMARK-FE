import { apiRequest } from '@/api/api';
import type { UserInfoResponse } from '@/types/api/users';
import type { ApiResponse } from '@/types/common/api-response';

const getUserInfo = async (): Promise<ApiResponse<UserInfoResponse>> => {
  return apiRequest<UserInfoResponse>({
    method: 'GET',
    url: '/users/me',
  });
};

const updateUserNickname = async (nickname: string): Promise<ApiResponse<string>> => {
  return apiRequest<string>({
    method: 'PATCH',
    url: '/users/me/nickname',
    data: {
      nickname,
    },
  });
};

export { getUserInfo, updateUserNickname };
