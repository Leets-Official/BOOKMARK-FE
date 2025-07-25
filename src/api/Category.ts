import api from './api';

export const createCategory = async (categoryName: string) => {
  try {
    console.log('📦 보내는 카테고리명:', categoryName);
    const response = await api.post('/categories', { categoryName });
    return response.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '카테고리 생성에 실패했습니다.',
    };
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '카테고리 조회에 실패했습니다.',
    };
  }
};
