import { tv } from 'tailwind-variants';
import { isMobile } from 'react-device-detect';
import { useScrollLock } from '@/hooks/ScrollLock';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

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
      false: 'w-[85%] h-[75%] max-w-[1200px] max-h-[900px]', // 더 작은 퍼센트
    },
  },
});

const MyPage = () => {
  // 외부 스크롤 방지
  useScrollLock(true);
  const navigate = useNavigate();
  const isMyPage = useLocation().pathname === '/my-page';
  const isProfileEdit = useLocation().pathname === '/my-page/profile-edit';
  const isCategoryManagement = useLocation().pathname === '/my-page/category-management';

  return (
    <div className={overlayStyle({ isMobile })} onClick={() => navigate('/')}>
      <div className={modalStyle({ isMobile })} onClick={(e) => e.stopPropagation()}>
        {isMobile ? (
          // 모바일: 전체 화면
          <Outlet />
        ) : (
          // PC: 사이드바 + 콘텐츠 레이아웃
          <div className='flex h-full'>
            {/* 왼쪽 사이드바 */}
            <div className='w-1/4 bg-gray-50 border-r border-gray-200 p-4'>
              <div className='flex flex-col gap-4'>
                <h2 className='text-lg font-semibold text-gray-900'>마이페이지</h2>

                {/* 메뉴 버튼들 */}
                <button
                  className={clsx(
                    'text-left p-3 rounded-lg transition-colors',
                    isMyPage ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700',
                  )}
                  onClick={() => navigate('/my-page')}
                >
                  프로필 정보
                </button>

                <button
                  className={clsx(
                    'text-left p-3 rounded-lg transition-colors',
                    isProfileEdit ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700',
                  )}
                  onClick={() => navigate('/my-page/profile-edit')}
                >
                  프로필 수정
                </button>

                <button
                  className={clsx(
                    'text-left p-3 rounded-lg transition-colors',
                    isCategoryManagement
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100 text-gray-700',
                  )}
                  onClick={() => navigate('/my-page/category-management')}
                >
                  카테고리 / 태그 관리
                </button>

                <button className='text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700'>
                  문의하기
                </button>

                <button className='text-left p-3 rounded-lg hover:bg-gray-100 text-red-600 mt-auto'>
                  로그아웃
                </button>
              </div>
            </div>

            {/* 오른쪽 콘텐츠 영역 */}
            <div className='flex-1 overflow-auto relative'>
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
