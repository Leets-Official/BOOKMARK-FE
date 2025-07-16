import { LeftIcon, RightIcon } from '@/assets';
import { isMobile } from 'react-device-detect';

interface CardListHeaderProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentNum: string;
}

const CardListHeader = ({ onNext, onPrev, currentNum }: CardListHeaderProps) => {
  return (
    <div className='w-4/5 mx-auto max-sm:w-9/10 mt-100'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <p className='font-bold sm:mr-7 mr-3 overflow-hidden max-sm:text-base text-xl'>Folder</p>
          {!isMobile && (
            <div onClick={onPrev} className='hover:brightness-0'>
              <LeftIcon width={24} height={24} />
            </div>
          )}
          <p className='overflow-hidden max-sm:text-base text-xl'>{currentNum}</p>
          {!isMobile && (
            <div onClick={onNext} className='hover:brightness-0'>
              <RightIcon width={24} height={24} />
            </div>
          )}
        </div>
        <div className='flex flex-row items-center gap-2 mr-3 font-semibold text-blue hover:brightness-75 cursor-pointer'>
          <p className='max-sm:text-[16px] text-[24px]'>+</p>
          <span className=' max-sm:text-[12px] text-base'>카테고리 추가</span>
        </div>
      </div>
      <hr className='border-t border-gray-300 my-4' />
    </div>
  );
};

export default CardListHeader;
