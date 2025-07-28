import { ProfileIcon } from '@/assets';
import { Button } from '@/components/common';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();
  const profileImage = localStorage.getItem('profileImage');

  return (
    <div className='fixed flex sm:right-5 right-0 items-center px-2 pr-5 sm:mt-5 mt-6 z-50'>
      {profileImage ? (
        <Button
          icon={
            <img
              src={profileImage}
              alt='profile'
              className='w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] text-stone active:text-black rounded-[25%]'
            />
          }
          onClick={() => navigate('/my-page')}
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
