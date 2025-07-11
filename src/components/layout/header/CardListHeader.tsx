import { LeftIcon, RightIcon, AddIcon } from '@/assets';

interface CardListHeaderProps {
  onClickLeft: () => void;
  onClickRight: () => void;
  currentNum: string;
}

const CardListHeader = ({ onClickLeft, onClickRight, currentNum }: CardListHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-1'>
        <p className='text-xl mr-5'>Folder</p>
        <button onClick={onClickLeft} className='cursor-pointer hover:opacity-70 transition'>
          <LeftIcon />
        </button>
        <p className='text-xl'>{currentNum}</p>
        <button onClick={onClickRight} className='cursor-pointer hover:opacity-70 transition'>
          <RightIcon />
        </button>
      </div>
      <div className='flex flex-row gap-1.5 items-center justify-center'>
        <p className='text-xl'>폴더 추가</p>
        <button className='rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors'>
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default CardListHeader;
