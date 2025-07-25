import api from '@/api/api';

const getSearchHistory = async () => {
  try {
    const response = await api.get('/search-histories');
    return response.data.data;
  } catch (error) {
    console.error('getSearchHistory 실패', error);
    throw error;
  }
};

const postSearchHistory = async (searchContent: string) => {
  try {
    const response = await api.post('/search-histories', { keyword: searchContent });
    return response.data.data;
  } catch (error) {
    console.error('postSearchHistory 실패', error);
    throw error;
  }
};
export { getSearchHistory, postSearchHistory };
