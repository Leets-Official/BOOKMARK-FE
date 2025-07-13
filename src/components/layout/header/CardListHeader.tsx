import { LeftIcon, RightIcon, AddIcon } from '@/assets';
import { isMobile } from 'react-device-detect';

interface CardListHeaderProps {
  onNext: () => void;
  onPrev: () => void;
  currentNum?: string;
}

const CardListHeader = ({ onNext, onPrev, currentNum }: CardListHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-1'>
        <p className={isMobile ? 'mr-3 text-[16px]' : 'mr-5 text-xl'}>Folder</p>
        <div onClick={onPrev} className='hover:brightness-0'>
          <LeftIcon />
        </div>
        <p className={isMobile ? 'text-[16px]' : 'text-xl'}>{currentNum}</p>
        <div onClick={onNext} className='hover:brightness-0'>
          <RightIcon />
        </div>
      </div>
      <div className='flex flex-row gap-1.5 items-center justify-center'>
        <p className={isMobile ? 'text-[16px]' : 'text-xl'}>폴더 추가</p>
        <button className='rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors'>
          <AddIcon className={isMobile ? 'w-6 h-6' : 'w-[30px] h-[30px'} />
        </button>
      </div>
    </div>
  );
};

export default CardListHeader;
