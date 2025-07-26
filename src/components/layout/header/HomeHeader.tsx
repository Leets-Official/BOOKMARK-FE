import { useState } from 'react';
import { ProfileIcon } from '@/assets';
import MyPage from '@/pages/MyPage';

const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='fixed flex sm:right-5 right-0 items-center px-2 pr-5 sm:mt-5 mt-6 z-50'>
        <ProfileIcon
          onClick={() => setIsOpen(true)}
          className='cursor-pointer sm:w-[30px] sm:h-[30px] text-stone active:text-black'
          fill={'white'}
        />
      </div>

      {isOpen && (
        <div className='fixed inset-0 z-40 bg-black bg-opacity-30 flex justify-center items-center'>
          <MyPage onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default HomeHeader;
