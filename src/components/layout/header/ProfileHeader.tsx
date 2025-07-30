import { ProfileIcon } from '@/assets';
import { Button } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useAtomValue } from 'jotai';
import { scrollBarWidthAtom } from '@/atoms';
import { useState, useEffect } from 'react';

const ProfileHeader = () => {
  const navigate = useNavigate();
  const profileImage = localStorage.getItem('profileImage');
  const scrollBarWidth = useAtomValue(scrollBarWidthAtom);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1200);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getRightPosition = () => {
    if (isLargeScreen) {
      // 1200px 이상: 1440px 중앙 기준 고정
      return scrollBarWidth > 0
        ? `calc(50% - 720px + 140px + ${scrollBarWidth / 2}px)`
        : `calc(50% - 720px + 140px)`;
    } else {
      // 1200px 미만: 화면 끝에서 고정
      return scrollBarWidth > 0
        ? `calc(12px + ${scrollBarWidth / 2}px)` // right-3 = 12px
        : '4px';
    }
  };

  return (
    <div
      className='fixed top-4 z-30 mt-1.5 sm:mt-0'
      style={{
        right: getRightPosition(),
      }}
    >
      {profileImage ? (
        <Button
          icon={
            <img
              src={profileImage}
              alt='profile'
              className='w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] rounded-[25%]'
            />
          }
          onClick={() => {
            if (isMobile) {
              navigate('./my-page');
            } else {
              navigate('./my-page/profile-edit');
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
  );
};

export default ProfileHeader;
