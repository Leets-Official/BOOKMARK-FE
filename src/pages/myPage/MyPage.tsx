import { Button, Image, Modal } from '@/components/common';
import CommonHeader from '@/components/layout/header/CommonHeader';
import { LogoutIcon } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/users/user';
import ensureHttps from '@/hooks/ensureHttps';

const MyPage = () => {
  const navigate = useNavigate();
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      navigate('/my-page/profile-edit', { replace: true });
    }
  }, [navigate]);

  const handleCopyInquiry = () => {
    const success = copy('insightboxxx@gmail.com');
    if (success) {
      toast.dismiss();
      toast.success('이메일이 복사되었습니다');
      setIsInquiryModalOpen(false);
    } else {
      toast.dismiss();
      toast.error('이메일 복사에 실패했습니다');
      setIsInquiryModalOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    toast.success('로그아웃 되었습니다');
    navigate('/login');
  };

  // 유저 정보 조회 API
  const { data: userInfo, isPending } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await getUserInfo();
      if (res.error) {
        throw new Error(res.message);
      }
      return res.data;
    },
  });

  return (
    <>
      {/* 헤더 */}
      <div className='absolute top-0 left-0 right-0 z-10'>
        <CommonHeader title='마이페이지' />
      </div>

      {/* 본문 */}
      <div className='flex flex-col justify-center mt-20 p-4 gap-15'>
        <div
          className='w-[351px] flex flex-row items-center rounded-[40px] border-2 border-lightGrayBlue p-4 gap-6'
          style={{ boxShadow: '0 2px 7px 0 rgba(2, 34, 94, 0.1)' }}
          onClick={() => {
            navigate('/my-page/profile-edit', { replace: true });
          }}
        >
          {isPending ? (
            <div className='w-[128px] h-[128px] rounded-[40px] bg-gray-200' />
          ) : (
            <>
              <div className='max-w-[128px] w-full'>
                <Image
                  src={ensureHttps(userInfo?.profileImage || '')}
                  alt='profile'
                  className='w-full h-auto aspect-square rounded-[40px] object-cover'
                  onClick={() => {
                    navigate('/my-page/profile-edit', { replace: true });
                  }}
                />
              </div>
              <div className='flex flex-col justify-center gap-4'>
                <p className='text-2xl font-semibold'>{userInfo?.nickname}</p>
                <p className='text-15 font-normal'>{userInfo?.email}</p>
              </div>
            </>
          )}
        </div>
        <div className='flex flex-col self-start w-full gap-4'>
          <p className='text-xs font-medium px-4 text-gray-500'>관리</p>
          <hr className='w-full border-lightGrayBlue border-1' />
          <Button
            className='text-15 text-stone font-medium text-left px-4 py-2 cursor-pointer'
            onClick={() => {
              navigate('/my-page/category-management', { replace: true });
            }}
          >
            카테고리 / 태그 관리
          </Button>
        </div>
        <div className='flex flex-col self-start w-full gap-4'>
          <p className='text-xs font-medium px-4 text-gray-500'>문의</p>
          <hr className='w-full border-lightGrayBlue border-1' />
          <Button
            className='text-15 text-stone font-medium text-left px-4 py-2 cursor-pointer'
            onClick={() => setIsInquiryModalOpen(true)}
          >
            문의하기
          </Button>
        </div>
      </div>

      {/* 푸터 */}
      <div className={clsx(isMobile ? 'absolute bottom-0 left-0 right-0 z-10' : 'flex mt-10')}>
        <Button
          icon={<LogoutIcon width={20} height={20} />}
          onClick={handleLogout}
          className='w-[124px] h-[48px] text-stone rounded-[10px] border-2 border-lightGrayBlue text-15 font-medium flex items-center justify-center gap-2 my-8 mx-4 cursor-pointer'
        >
          로그아웃
        </Button>
      </div>

      {isInquiryModalOpen && (
        <Modal
          title='문의 이메일'
          onConfirm={handleCopyInquiry}
          onCancel={() => setIsInquiryModalOpen(false)}
          confirmLabel='복사하기'
        >
          <p className='text-15 p-4'>insightboxxx@gmail.com</p>
        </Modal>
      )}
    </>
  );
};

export default MyPage;
