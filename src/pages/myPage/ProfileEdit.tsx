import CommonHeader from '@/components/layout/header/CommonHeader';
import { Button } from '@/components/common';
import { isMobile } from 'react-device-detect';
import TextField from '@/components/ui/TextField';
import { useState } from 'react';

const ProfileEdit = () => {
  const [nickname, setNickname] = useState('');
  const profileImage = localStorage.getItem('profileImage');

  const handleBlur = () => {
    console.log('blur');
  };

  return (
    <>
      {/* 헤더 */}
      {isMobile && (
        <div className='absolute top-0 left-0 right-0 z-10'>
          <CommonHeader title='계정설정' />
        </div>
      )}

      {/* 본문 */}
      <div className='flex flex-col items-center justify-center my-20 p-4 gap-15'>
        <div className='flex flex-col self-start w-full gap-4'>
          <p className='text-xs font-medium px-4 text-gray-500'>프로필</p>
          <hr className='w-full border-lightGrayBlue border-1' />
          <div className='flex flex-col self-start w-full gap-4'>
            <p className='text-xs font-medium'>사진</p>
            <Button
              icon={
                <img
                  src={profileImage || ''}
                  alt='profile'
                  className='w-[96px] h-[96px] rounded-[20px]'
                />
              }
              onClick={() => {
                console.log('사진 클릭');
              }}
            />
          </div>
          <div className='flex flex-col self-start w-full gap-4'>
            <TextField
              label='이름'
              placeholder='김연수'
              onChange={setNickname}
              onBlur={handleBlur}
              value={nickname}
              className='border border-gray-200 bg-gray-50'
            />
          </div>
          <div className='flex flex-col self-start w-full gap-4'>
            <p className='text-xs font-medium'>메일</p>
            <p className='text-15 font-normal p-2'>qug1t7@gmail.com</p>
          </div>
        </div>
        <div className='flex flex-col self-start w-full gap-4'>
          <p className='text-xs font-medium px-4 text-gray-500'>로그인 상태</p>
          <hr className='w-full border-lightGrayBlue border-1' />
          <p className='text-base font-semibold p-2'>카카오</p>
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
