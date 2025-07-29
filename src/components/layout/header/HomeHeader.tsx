import { ProfileIcon } from '@/assets';
import { Button } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const HomeHeader = () => {
  const navigate = useNavigate();
  const profileImage = localStorage.getItem('profileImage');

  return (
    <div className='fixed flex sm:right-10 right-3 items-center mt-5 z-50'>
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
  );
};

export default HomeHeader;
