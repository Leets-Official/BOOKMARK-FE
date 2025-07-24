import { ProfileIcon } from '@/assets';

const HomeHeader = () => {
  const profileImage = localStorage.getItem('profileImage');

  return (
    <div className='fixed flex sm:right-5 right-0 items-center px-2 pr-5 sm:mt-5 mt-6 z-50'>
      {profileImage ? (
        <img
          src={profileImage}
          alt='profile'
          className='sm:w-[40px] sm:h-[40px] text-stone active:text-black rounded-[25%]'
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
