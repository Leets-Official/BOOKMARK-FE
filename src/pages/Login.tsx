import { kakaoLogin } from '@/api/auth/auth_api';
import { KakaoLogoIcon } from '@/assets';
import Button from '@/components/common/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    kakaoLogin();
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/', { replace: true }); // 이미 로그인된 경우 홈으로 이동
    }
  }, [navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-4'>
      <div className='flex flex-col items-center space-y-6 w-full max-w-xs'>
        {/* 로고 텍스트 (나중에 이미지) */}
        <h1 className='text-2xl font-bold'>Logo</h1>

        <Button
          onClick={handleKakaoLogin}
          icon={<KakaoLogoIcon width={18} height={18} className='mr-2' />}
          className='bg-[#FEE500] text-black hover:brightness-90 disabled:brightness-80 flex items-center justify-center rounded-lg shadow w-full h-[45px]'
        >
          카카오 로그인
        </Button>
      </div>
    </div>
  );
};

export default Login;
