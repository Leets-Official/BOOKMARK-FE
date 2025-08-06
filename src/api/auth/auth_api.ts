import { apiRequest } from '@/api/api';
import type { KakaoLoginResponse } from '@/types/api/auth';
import type { ApiResponse } from '@/types/common/api-response';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const kakaoLogin = async () => {
  try {
    // 현재 도메인을 기반으로 전체 URL 생성
    const currentOrigin = window.location.origin;
    const fullRedirectUri = `${currentOrigin}/${KAKAO_REDIRECT_URI}`;

    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(fullRedirectUri)}&scope=account_email,profile_nickname,profile_image,talk_message`;
    window.location.href = KAKAO_LOGIN_URL;
  } catch (error) {
    console.error('카카오 로그인 URL 요청 실패:', error);
  }
};

const kakaoLoginApi = async (code: string): Promise<ApiResponse<KakaoLoginResponse>> => {
  const currentOrigin = window.location.origin;
  const fullRedirectUri = `${currentOrigin}/${KAKAO_REDIRECT_URI}`;

  return apiRequest<KakaoLoginResponse>({
    method: 'GET',
    url: '/auth/login/kakao',
    params: {
      code: code,
      redirectUri: fullRedirectUri,
    },
  });
};

export { kakaoLogin, kakaoLoginApi };
