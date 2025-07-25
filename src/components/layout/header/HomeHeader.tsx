import { ProfileIcon } from '@/assets';

const HomeHeader = () => {
  const profileImage = localStorage.getItem('profileImage');

  return (
    <div className='fixed flex sm:right-10 right-3 items-center mt-6 sm:mt-5 z-50 cursor-pointer'>
      {profileImage ? (
        <img
          src={profileImage}
          alt='profile'
          className='w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-stone active:text-black rounded-[25%]'
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
