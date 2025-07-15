import { ProfileIcon } from '@/assets';

const MobileHeader = () => {
  return (
    <div className='fixed flex right-0 items-center px-4 mt-6 z-50'>
      <ProfileIcon width={26} height={26} fill={'white'} />
    </div>
  );
};

export default MobileHeader;
