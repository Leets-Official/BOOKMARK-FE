import { kakaoLogin } from '@/api/auth/auth_api';
import { KakaoLogoIcon, SymbolIcon } from '@/assets';
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
    <div className='flex items-center justify-center min-h-screen p-20'>
      <div className='flex flex-row h-[52vh] rounded-[20px] overflow-hidden shadow-[0_2px_37px_rgba(2,34,94,0.1)]'>
        <div className='flex flex-col bg-white px-13 pt-30'>
          <SymbolIcon />
          <p className='text-blue font-pretendard font-extrabold text-[33px] mt-5'>
            INSIGHT
            <br />
            BOX
          </p>
          <p className='font-medium text-[#6D7280] text-sm mt-5'>
            나의 인사이트, 잊어도 쉽게 찾아낼 수 있어야 하니까
          </p>
        </div>
        <div className='flex flex-col bg-loginBlue pt-30 pl-13 pr-30'>
          <p className='text-white font-pretendard font-extrabold text-[40px] leading-[52px]'>
            로그인하고
            <br />
            나만의 인사이트 박스를
            <br />
            만들어가요
          </p>
          <div className='flex flex-col mt-16'>
            <Button
              onClick={handleKakaoLogin}
              icon={<KakaoLogoIcon width={18} height={18} className='flex mr-2' />}
              className='bg-[#FEE500] font-semibold py-[16px] text-black hover:brightness-90 transition flex items-center justify-center rounded-[6px] shadow w-9/10'
            >
              카카오로 로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
