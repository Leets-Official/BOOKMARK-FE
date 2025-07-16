import { LeftIcon, RightIcon } from '@/assets';
import { isMobile } from 'react-device-detect';

interface CardListHeaderProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentNum: string;
}

const TextSize = 'overflow-hidden text-ellipsis whitespace-nowrap max-sm:text-base text-xl';

const CardListHeader = ({ onNext, onPrev, currentNum }: CardListHeaderProps) => {
  return (
    <div className='w-4/5 mx-auto max-sm:w-9/10 mt-100'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <p className='font-bold sm:mr-7 mr-3 overflow-hidden text-ellipsis whitespace-nowrap max-sm:text-base text-xl'>
            Folder
          </p>
          {!isMobile && (
            <div onClick={onPrev} className='hover:brightness-0'>
              <LeftIcon width={24} height={24} />
            </div>
          )}
          <p className={TextSize}>{currentNum}</p>
          {!isMobile && (
            <div onClick={onNext} className='hover:brightness-0'>
              <RightIcon width={24} height={24} />
            </div>
          )}
        </div>
        <div className='flex flex-row items-center'>
          <p className={TextSize}>+ 카테고리 추가</p>
          <button className='rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors' />
        </div>
      </div>
      <hr className='border-t border-gray-300 my-4' />
    </div>
  );
};

export default CardListHeader;
