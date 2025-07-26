import api from '@/api/api';
import type { CategoryProps } from '@/types';

export const createCategory = async (categoryName: string) => {
  try {
    const response = await api.post('/categories', { categoryName });
    return response.data.data;
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
    return response.data.data as CategoryProps[];
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '카테고리 조회에 실패했습니다.',
    };
  }
};

export const getCategoriesWithTag = async () => {
  try {
    const response = await api.get('/categories/with-tags');
    return response.data.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '카테고리 및 태그 조회에 실패했습니다.',
    };
  }
};
