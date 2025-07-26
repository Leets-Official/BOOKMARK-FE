import api from '@/api/api';

const getSearchHistory = async () => {
  try {
    const response = await api.get('/search-histories');
    return response.data.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '검색 기록 조회에 실패했습니다.',
    };
  }
};

const postSearchHistory = async (searchContent: string) => {
  try {
    const response = await api.post('/search-histories', { keyword: searchContent });
    return response.data.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '검색 기록 생성에 실패했습니다.',
    };
  }
};

const deleteSearchHistory = async (searchHistoryId: number) => {
  try {
    const response = await api.delete(`/search-histories/${searchHistoryId}`);
    return response.data.data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || '검색 기록 삭제에 실패했습니다.',
    };
  }
};

export { getSearchHistory, postSearchHistory, deleteSearchHistory };
