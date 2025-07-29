import { tv } from 'tailwind-variants';
import { isMobile } from 'react-device-detect';
import { useScrollLock } from '@/hooks/ScrollLock';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { Button } from '@/components/common';
import { DeleteIcon, LogoutIcon } from '@/assets';

const overlayStyle = tv({
  base: 'fixed inset-0 z-100 flex items-center justify-center',
  variants: {
    isMobile: {
      true: '',
      false: 'bg-black/50',
    },
  },
});

const modalStyle = tv({
  base: 'bg-white rounded-[30px] flex flex-col overflow-hidden',
  variants: {
    isMobile: {
      true: 'w-full h-full',
      false: 'w-[65%] h-[55%] max-h-[496px] max-w-[830px]',
    },
  },
});

const MyPage = () => {
  // 외부 스크롤 방지
  useScrollLock(true);
  const navigate = useNavigate();
  const isProfileEdit = useLocation().pathname === '/my-page/profile-edit';
  const isCategoryManagement = useLocation().pathname === '/my-page/category-management';
  const isInquiry = useLocation().pathname === '/my-page/inquiry';

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    toast.success('로그아웃 되었습니다');
    navigate('/login');
  };

  return (
    <div className={overlayStyle({ isMobile })} onClick={() => navigate('/')}>
      <div className={modalStyle({ isMobile })} onClick={(e) => e.stopPropagation()}>
        {isMobile ? (
          // 모바일: 전체 화면
          <Outlet />
        ) : (
          // PC: 사이드바 + 콘텐츠 레이아웃
          <div className='flex h-full relative'>
            {/* 왼쪽 사이드바 */}
            <div className='w-1/4 bg-gray-50 border-r border-gray-200 p-4'>
              <div className='flex flex-col'>
                <h2 className='text-xs font-medium text-gray-500 p-3 mt-3'>마이페이지</h2>

                {/* 메뉴 버튼들 */}
                <Button
                  className={clsx(
                    'text-left p-3 rounded-lg transition-colors text-stone',
                    isProfileEdit ? 'bg-grayBg' : 'hover:bg-gray-100',
                  )}
                  onClick={() => navigate('/my-page/profile-edit')}
                >
                  프로필 수정
                </Button>

                <Button
                  className={clsx(
                    'text-left p-3 rounded-lg transition-colors text-stone',
                    isCategoryManagement ? 'bg-grayBg' : 'hover:bg-gray-100',
                  )}
                  onClick={() => navigate('/my-page/category-management')}
                >
                  카테고리 / 태그 관리
                </Button>

                <Button
                  className={clsx(
                    'text-left p-3 rounded-lg transition-colors text-stone',
                    isInquiry ? 'bg-grayBg' : 'hover:bg-gray-100',
                  )}
                  onClick={() => navigate('/my-page/inquiry')}
                >
                  문의하기
                </Button>

                <Button
                  className='absolute bottom-8 left-5 w-[124px] h-[48px] text-stone rounded-[10px] border-2 border-lightGrayBlue text-15 font-medium flex items-center justify-center gap-2 cursor-pointer'
                  icon={<LogoutIcon width={20} height={20} />}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  로그아웃
                </Button>
              </div>
            </div>

            {/* 오른쪽 콘텐츠 영역 */}
            <div className='flex-1 overflow-auto hide-scrollbar relative max-w-[375px]'>
              <Outlet />
            </div>
            <div className='absolute top-10 right-10'>
              <Button
                icon={<DeleteIcon width={12} height={12} stroke='#000000' />}
                onClick={() => navigate('/')}
                className='cursor-pointer'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
