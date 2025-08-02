import axios from 'axios';
import { apiRequest } from '@/api/api';
import type { ApiResponse } from '@/types/common/api-response';
import type { PresignedUrlProps } from '@/types/api/presinged_url';

export const getPresignedUrl = async (
  fileName: string,
): Promise<ApiResponse<PresignedUrlProps>> => {
  return apiRequest<PresignedUrlProps>({
    method: 'GET',
    url: '/files/presigned-url',
    params: { fileName },
  });
};

export const uploadImage = async (presignedUrl: string, file: File) => {
  try {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return presignedUrl.split('?')[0];
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '이미지 업로드에 실패했습니다.',
    };
  }
};
