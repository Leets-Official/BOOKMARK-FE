import api from '../api';

export const createTag = async (categoryId: number, tagName: string) => {
  try {
    const response = await api.post('/tags', { categoryId, tagName });
    return response.data.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '태그 생성에 실패했습니다.',
    };
  }
};

export const getTags = async (categoryId: number) => {
  try {
    const response = await api.get('/tags', { params: { categoryId } });
    return response.data.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '태그 조회에 실패했습니다.',
    };
  }
};
