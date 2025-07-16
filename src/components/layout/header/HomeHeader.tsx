import { ProfileIcon } from '@/assets';

const HomeHeader = () => {
  return (
    <div className='fixed flex sm:right-5 right-0 items-center px-2 pr-5 sm:mt-5 mt-6 z-50'>
      <ProfileIcon className='sm:w-[30px] sm:h-[30px] w-6 h-6' fill={'white'} />
    </div>
  );
};

export default HomeHeader;
