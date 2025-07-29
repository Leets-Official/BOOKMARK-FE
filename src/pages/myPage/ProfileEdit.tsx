import CommonHeader from '@/components/layout/header/CommonHeader';
import { Button } from '@/components/common';
import { isMobile } from 'react-device-detect';
import TextField from '@/components/ui/TextField';
import { useState } from 'react';
import DeleteModal from '@/components/ui/modal/DeleteModal';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/users/user';

const ProfileEdit = () => {
  const [nickname, setNickname] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      <div
        className={clsx(
          'flex flex-col items-center justify-center p-4',
          isMobile ? 'mt-20 gap-15' : 'mt-10 gap-10',
        )}
      >
        {!isMobile && <p className='text-2xl font-semibold text-stone self-start'>프로필 수정</p>}
        <div className='flex flex-col self-start w-full gap-4'>
          <div className='flex flex-col gap-2'>
            <p className={'text-xs font-medium text-gray-500'}>프로필</p>
            <hr className='w-full border-lightGrayBlue border-1' />
          </div>
          <div className='flex flex-col self-start w-full gap-4'>
            <p className='text-xs font-medium'>사진</p>

            {isPending ? (
              <div className='w-[96px] h-[96px] rounded-[20px] bg-gray-200' />
            ) : (
              <Button
                icon={
                  <img
                    src={userInfo?.profileImage}
                    alt='profile'
                    className='w-[96px] h-[96px] rounded-[20px]'
                  />
                }
                onClick={() => {
                  console.log('사진 클릭');
                }}
                className='cursor-pointer'
              />
            )}
          </div>
          <div className='flex flex-col self-start w-full gap-4'>
            <TextField
              label='이름'
              placeholder={userInfo?.nickname || ''}
              onChange={setNickname}
              onBlur={handleBlur}
              value={nickname}
              className='border border-gray-200 bg-gray-50'
            />
            <div className='flex flex-col gap-2'>
              <p className='text-xs'>메일</p>
              <p className='text-15 p-4 w-full rounded-[12px] py-3 border border-gray-200 bg-gray-50 text-gray'>
                {userInfo?.email || '이메일'}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col self-start w-full gap-4'>
          <div className='flex flex-col gap-2'>
            <p className={'text-xs font-medium text-gray-500'}>로그인 상태</p>
            <hr className='w-full border-lightGrayBlue border-1' />
          </div>
          <p className='text-base font-semibold px-2'>카카오</p>
        </div>
      </div>
      {/* 푸터 */}
      <div className={clsx(isMobile ? 'absolute bottom-0 left-0 z-10' : 'flex')}>
        <Button
          onClick={() => setIsDeleteModalOpen(true)}
          className='w-[76px] h-[32px] text-gray text-15 font-medium flex items-center justify-center mx-2 my-8 cursor-pointer'
        >
          계정삭제
        </Button>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          console.log('계정삭제');
        }}
        warningText='정말 계정을 삭제하시겠습니까?'
        subText='이 계정에 관련한 모든 내용은 영구삭제되며, 복구하실 수 없습니다'
      />
    </>
  );
};

export default ProfileEdit;
