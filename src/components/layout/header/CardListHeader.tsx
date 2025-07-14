import { LeftIcon, RightIcon, AddIcon } from '@/assets';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';

interface CardListHeaderProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentNum: string;
}

const CardListHeader = ({ onNext, onPrev, currentNum }: CardListHeaderProps) => {
  return (
    <div className={clsx('w-4/5 mx-auto', isMobile ? 'w-9/10 mt-140' : 'w-4/5 mt-180')}>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <p className={clsx('font-bold', isMobile ? 'mr-3 text-base' : 'mr-5 text-xl')}>Folder</p>
          {!isMobile && (
            <div onClick={onPrev} className='hover:brightness-0'>
              <LeftIcon />
            </div>
          )}
          <p className={isMobile ? 'text-base' : 'text-xl'}>{currentNum}</p>
          {!isMobile && (
            <div onClick={onNext} className='hover:brightness-0'>
              <RightIcon />
            </div>
          )}
        </div>
        <div className='flex flex-row gap-1.5 items-center'>
          <p className={isMobile ? 'text-base' : 'text-xl'}>폴더 추가</p>
          <button className='rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors'>
            <AddIcon className={isMobile ? 'w-6 h-6' : ''} />
          </button>
        </div>
      </div>
      <hr className='border-t border-gray-300 my-3' />
    </div>
  );
};

export default CardListHeader;
