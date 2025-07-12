import { LeftIcon, RightIcon, AddIcon } from '@/assets';
import { isMobile } from 'react-device-detect';

interface CardListHeaderProps {
  currentNum?: string;
}

const CardListHeader = ({ currentNum }: CardListHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-1'>
        <p className={isMobile ? 'mr-3 text-[16px]' : 'mr-5 text-xl'}>Folder</p>
        <LeftIcon />
        <p className={isMobile ? 'text-[16px]' : 'text-xl'}>{currentNum}</p>
        <RightIcon />
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
