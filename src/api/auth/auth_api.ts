import api from '@/api/api';

const kakaoLoginApi = async (code: string) => {
  console.log('code', code);
  try {
    const response = await api.get('/auth/login/kakao', {
      params: { code },
    });
    console.log('response', response);
    return response.data.data;
  } catch (error) {
    console.error('kakao login 실패', error);
    throw error;
  }
};

export default kakaoLoginApi;
