import { tv } from 'tailwind-variants';
import { isMobile } from 'react-device-detect';
import { useScrollLock } from '@/hooks/ScrollLock';
import CommonHeader from '@/components/layout/header/CommonHeader';
import { Button } from '@/components/common';
import { LogoutIcon, ProfileIcon } from '@/assets';

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
  base: 'bg-gray-100 rounded-[30px] flex flex-col overflow-hidden',
  variants: {
    isMobile: {
      true: 'w-full h-full',
      false: 'w-[369px] h-[773px]',
    },
  },
});

const MyPage = () => {
  // 외부 스크롤 방지
  useScrollLock(true);

  return (
    <div className={overlayStyle({ isMobile })}>
      <div className={modalStyle({ isMobile })} onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className='absolute top-0 left-0 right-0 z-10'>
          <CommonHeader title='마이페이지' />
        </div>

        {/* 본문 */}
        <div className='flex flex-col items-center justify-center my-20 p-4 gap-15'>
          <div
            className='w-[351px] flex flex-row items-center rounded-[40px] border-2 border-lightGrayBlue p-4 gap-6'
            style={{ boxShadow: '0 2px 7px 0 rgba(2, 34, 94, 0.1)' }}
          >
            <Button
              icon={<ProfileIcon width={128} height={128} />}
              onClick={() => {
                console.log('이미지 클릭');
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
              onClick={() => {
                console.log('문의하기 클릭');
              }}
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
      </div>
    </div>
  );
};

export default MyPage;
