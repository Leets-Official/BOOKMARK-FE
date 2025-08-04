import type { notificatonProps } from '@/types/api/notification';
import type { ApiResponse } from '@/types/common/api-response';
import { apiRequest } from '../api';

export const getNotificaton = async (
  bookmarkId: number,
): Promise<ApiResponse<notificatonProps[]>> => {
  return apiRequest<notificatonProps[]>({
    method: 'GET',
    url: '/notifications',
    params: { bookmarkId },
  });
};
