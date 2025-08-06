import type { ApiResponse } from '@/types/common/api-response';
import api from '../api';

export const getThumbnailImage = async (thumbnailUrl: string): Promise<ApiResponse<string>> => {
  // URL 유효성 검사
  if (!thumbnailUrl || thumbnailUrl.length < 10) {
    console.error('유효하지 않은 URL:', thumbnailUrl);
    return {
      data: null,
      error: true,
      message: '유효하지 않은 이미지 URL',
    };
  }

  try {
    const response = await api.get('/files/thumbnail-image', {
      params: { thumbnailUrl: thumbnailUrl },
      responseType: 'arraybuffer', // 바이너리 데이터로 받기
    });

    // ArrayBuffer를 Blob으로 변환
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const blobUrl = URL.createObjectURL(blob);

    return {
      data: blobUrl,
      error: false,
    };
  } catch (error) {
    console.error('getThumbnailImage 에러:', error);
    return {
      data: null,
      error: true,
      message: '썸네일 이미지 가져오기 실패',
    };
  }
};
