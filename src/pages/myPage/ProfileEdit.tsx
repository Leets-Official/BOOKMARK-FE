import { useScrollLock } from '@/hooks/ScrollLock';
import CommonHeader from '@/components/layout/header/CommonHeader';
import { Button } from '@/components/common';

const ProfileEdit = () => {
  // 외부 스크롤 방지
  useScrollLock(true);
  return (
    <>
      {/* 헤더 */}
      <div className='absolute top-0 left-0 right-0 z-10'>
        <CommonHeader title='계정설정' />
      </div>

      {/* 본문 */}
      <div className='flex flex-col items-center justify-center my-20 p-4 gap-15'>
        <div className='flex flex-col self-start w-full gap-4'>
          <p className='text-xs font-medium px-4 text-gray-500'>프로필</p>
          <hr className='w-full border-lightGrayBlue border-1' />
          <div className='flex flex-col self-start w-full gap-4'>
            <p className='text-xs font-medium'>사진</p>
          </div>
        </div>
        <div className='flex flex-col self-start w-full gap-4'>
          <p className='text-xs font-medium px-4 text-gray-500'>로그인 상태</p>
          <hr className='w-full border-lightGrayBlue border-1' />
        </div>
      </div>
      {/* 푸터 */}
      <div className='absolute bottom-0 left-0 right-0 z-10'>
        <Button
          onClick={() => {
            console.log('로그아웃 클릭');
          }}
          className='w-[124px] h-[48px] text-stone text-15 font-medium flex items-center justify-center gap-2 my-8'
        >
          계정삭제
        </Button>
      </div>
    </>
  );
};

export default ProfileEdit;
