import { ProfileIcon } from '@/assets';
import { Button } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useAtomValue } from 'jotai';
import { scrollBarWidthAtom } from '@/atoms';
import clsx from 'clsx';

const HomeHeader = () => {
  const navigate = useNavigate();
  const profileImage = localStorage.getItem('profileImage');
  const scrollBarWidth = useAtomValue(scrollBarWidthAtom);
  return (
    <div
      className={clsx(
        'fixed top-4 max-w-[1440px] w-full z-10 sm:ml-0 ml-2',
        scrollBarWidth > 0
          ? `left-[calc(50%-${scrollBarWidth}px)]` // 스크롤바 너비만큼 왼쪽으로 조정
          : 'left-1/2 transform -translate-x-1/2',
      )}
    >
      <div className='flex justify-end px-4'>
        {profileImage ? (
          <Button
            icon={
              <img
                src={profileImage}
                alt='profile'
                className='w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-[25%]'
              />
            }
            onClick={() => {
              if (isMobile) {
                navigate('/my-page');
              } else {
                navigate('/my-page/profile-edit');
              }
            }}
            className='cursor-pointer'
          />
        ) : (
          <ProfileIcon
            className='sm:w-[30px] sm:h-[30px] text-stone active:text-black'
            fill={'white'}
          />
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
