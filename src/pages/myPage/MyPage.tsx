import { Button } from '@/components/common';
import CommonHeader from '@/components/layout/header/CommonHeader';
import { LogoutIcon } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useScrollLock } from '@/hooks/ScrollLock';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

const MyPage = () => {
  // 외부 스크롤 방지
  useScrollLock(true);
  const navigate = useNavigate();
  const profileImage = localStorage.getItem('profileImage');

  const handleCopyInquiry = () => {
    const success = copy('insightboxxx@gmail.com');
    if (success) {
      toast.success('이메일이 복사되었습니다');
    } else {
      toast.error('이메일 복사에 실패했습니다');
    }
  };

  return (
    <>
      {/* 헤더 */}
      {isMobile && (
        <div className='absolute top-0 left-0 right-0 z-10'>
          <CommonHeader title='마이페이지' />
        </div>
      )}

      {/* 본문 */}
      <div className='flex flex-col justify-center my-20 p-4 gap-15'>
        <div
          className='w-[351px] flex flex-row items-center rounded-[40px] border-2 border-lightGrayBlue p-4 gap-6'
          style={{ boxShadow: '0 2px 7px 0 rgba(2, 34, 94, 0.1)' }}
        >
          <Button
            icon={
              <img
                src={profileImage || ''}
                alt='profile'
                className='w-[128px] h-[128px] rounded-[40px]'
              />
            }
            onClick={() => {
              navigate('/my-page/profile-edit');
            }}
          />
          <div className='flex flex-col justify-center gap-4'>
            <p className='text-2xl font-semibold'>김민수</p>
            <p className='text-15 font-normal'>qug1t7@gmail.com</p>
          </div>
        </div>
        <div className='flex flex-col self-start w-full gap-4'>
          <p className='text-xs font-medium px-4 text-gray-500'>관리</p>
          <hr className='w-full border-lightGrayBlue border-1' />
          <Button
            className='text-15 text-stone font-medium text-left px-4 py-2'
            onClick={() => {
              console.log('카테고리 / 태그 관리 클릭');
            }}
          >
            카테고리 / 태그 관리
          </Button>
        </div>
        <div className='flex flex-col self-start w-full gap-4'>
          <p className='text-xs font-medium px-4 text-gray-500'>문의</p>
          <hr className='w-full border-lightGrayBlue border-1' />
          <Button
            className='text-15 text-stone font-medium text-left px-4 py-2'
            onClick={handleCopyInquiry}
          >
            문의하기
          </Button>
        </div>
      </div>

      {/* 푸터 */}
      <div className='absolute bottom-0 left-0 right-0 z-10'>
        <Button
          icon={<LogoutIcon width={20} height={20} />}
          onClick={() => {
            console.log('로그아웃 클릭');
          }}
          className='w-[124px] h-[48px] text-stone rounded-[10px] border-2 border-lightGrayBlue text-15 font-medium flex items-center justify-center gap-2 my-8 mx-4'
        >
          로그아웃
        </Button>
      </div>
    </>
  );
};

export default MyPage;
