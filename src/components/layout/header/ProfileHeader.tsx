import { ProfileIcon } from '@/assets';
import { Button } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useAtomValue } from 'jotai';
import { scrollBarWidthAtom } from '@/atoms';

const ProfileHeader = () => {
  const navigate = useNavigate();
  const profileImage = localStorage.getItem('profileImage');
  const scrollBarWidth = useAtomValue(scrollBarWidthAtom);

  return (
    <div
      className='fixed top-0 left-0 w-full z-50 pointer-events-none'
      style={{
        paddingRight: scrollBarWidth > 0 ? `${scrollBarWidth}px` : undefined,
      }}
    >
      <div className='max-w-[1200px] mx-auto relative pointer-events-auto'>
        <div className='absolute top-5 right-3 sm:top-4 sm:right-5'>
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
      </div>
    </div>
  );
};

export default ProfileHeader;
