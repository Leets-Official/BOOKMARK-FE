import api from './api';
import axios from 'axios';

export const postCategory = async (categoryName: string) => {
  try {
    const response = await api.post('/categories', { categoryName });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || '카테고리 작성에 실패했습니다.',
      };
    }
    return {
      success: false,
      message: '알 수 없는 에러가 발생했습니다.',
    };
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || '카테고리 조회에 실패했습니다.',
      };
    }
    return {
      success: false,
      message: '알 수 없는 에러가 발생했습니다.',
    };
  }
};
