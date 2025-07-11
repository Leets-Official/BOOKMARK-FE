import { BackArrow } from '@/assets';

const SaveHeader = () => {
  return (
    <div className='flex flex-row items-center w-full px-4 justify-center'>
      <BackArrow width={24} height={24} className='absolute left-4' />
      <p className='text-[16px] font-medium'>링크 저장</p>
    </div>
  );
};

export default SaveHeader;
