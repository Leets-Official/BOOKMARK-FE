import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { kakaoLoginApi } from '@/api/auth/auth_api';
import { isMobile } from 'react-device-detect';
import Lottie from 'lottie-react';
import logoAnimation from '@/assets/logoAnimation.json';
import toast from 'react-hot-toast';
import ensureHttps from '@/hooks/ensureHttps';

function KakaoCallBack() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/', { replace: true }); // 이미 로그인된 경우 홈으로 이동
    }
  }, [navigate]);

  const kakaoLoginMutation = useMutation({
    mutationFn: kakaoLoginApi,
    onSuccess: (res) => {
      if (res.error) {
        console.error('kakao login 실패, error', res.message);
        toast.error('로그인 실패');
        navigate('/login', { replace: true });
        return;
      }

      const { jwtAccessToken, jwtRefreshToken, profileImage } = res.data;
      localStorage.setItem('accessToken', jwtAccessToken);
      localStorage.setItem('refreshToken', jwtRefreshToken);
      localStorage.setItem('profileImage', ensureHttps(profileImage));
      toast.success('로그인 성공');
      navigate('/', { replace: true });
    },
    onError: (error) => {
      console.error('kakao login 실패, error', error);
      toast.error('로그인 실패');
      navigate('/login', { replace: true });
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      console.log('Authorization code is not found');
      return;
    }
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    kakaoLoginMutation.mutate(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Lottie
        animationData={logoAnimation}
        loop
        autoplay
        style={{
          width: isMobile ? '170px' : '250px',
          height: isMobile ? '180px' : '260px',
        }}
      />
      <p className='text-[#6D7280] font-medium'>Loading...</p>
    </div>
  );
}

export default KakaoCallBack;
