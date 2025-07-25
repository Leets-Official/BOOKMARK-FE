import api from '@/api/api';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const kakaoLogin = async () => {
  try {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=account_email,profile_nickname,profile_image,talk_message`;
    window.location.href = KAKAO_LOGIN_URL;
  } catch (error) {
    console.error('카카오 로그인 URL 요청 실패:', error);
  }
};

const kakaoLoginApi = async (code: string) => {
  try {
    const response = await api.get('/auth/login/kakao', {
      params: { code },
    });
    return response.data.data;
  } catch (error) {
    console.error('kakao login 실패', error);
    throw error;
  }
};

export { kakaoLogin, kakaoLoginApi };
