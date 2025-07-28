import { LeftIcon, ListOrderIcon, RightIcon } from '@/assets';
import { isMobile } from 'react-device-detect';

interface CardListHeaderProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentNum?: string;
  title: string;
  showPagination?: boolean;
  showCategory?: boolean;
  showAllContent?: boolean;
  sortLabel?: string;
  onSortToggle?: () => void;
}

const CardListHeader = ({
  onNext,
  onPrev,
  currentNum,
  title,
  showPagination = false,
  showAllContent = false,
  sortLabel,
  onSortToggle,
}: CardListHeaderProps) => {
  return (
    <div className='w-4/5 mx-auto max-sm:w-9/10 mt-20'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <p className='font-bold sm:mr-7 mr-3 overflow-hidden max-sm:text-base text-xl text-stone'>
            {title}
          </p>
          {showPagination && (
            <>
              {!isMobile && (
                <div onClick={onPrev} className='hover:brightness-0'>
                  <LeftIcon width={24} height={24} strokeWidth={1.5} stroke='#545966' />
                </div>
              )}
              <p className='overflow-hidden max-sm:text-base text-xl'>{currentNum}</p>
              {!isMobile && (
                <div onClick={onNext} className='hover:brightness-0'>
                  <RightIcon width={24} height={24} strokeWidth={1.5} />
                </div>
              )}
            </>
          )}
        </div>
        {showAllContent && (
          <div
            onClick={onSortToggle}
            className='flex flex-row items-center gap-1 mr-3 font-semibold text-stone hover:brightness-75 cursor-pointer'
          >
            <p className=' max-sm:text-[12px] text-base'>{sortLabel}</p>
            <span className='max-sm:text-[16px] text-[24px]'>
              <ListOrderIcon
                width={16}
                height={16}
                strokeWidth={2.5}
                className='w-3.5 h-3.5 sm:w-4.5 sm:h-4.5'
              />
            </span>
          </div>
        )}
      </div>
      <hr className='border-t border-gray-300 mt-5 mb-1' />
    </div>
  );
};

export default CardListHeader;
