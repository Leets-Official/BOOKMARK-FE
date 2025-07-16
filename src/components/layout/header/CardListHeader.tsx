import { LeftIcon, RightIcon } from '@/assets';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import { tv } from 'tailwind-variants';

interface CardListHeaderProps {
  onNext?: () => void;
  onPrev?: () => void;
  currentNum: string;
}

const TextSize = tv({
  base: 'overflow-hidden text-ellipsis whitespace-nowrap max-sm:text-base text-xl',
  variants: {
    mobile: {
      true: 'text-base',
    },
  },
});

const CardListHeader = ({ onNext, onPrev, currentNum }: CardListHeaderProps) => {
  return (
    <div className={clsx('w-4/5 mx-auto max-sm:w-9/10', isMobile ? 'w-9/10 mt-100' : 'mt-100')}>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <p className='font-bold md:mr-7 mr-3 overflow-hidden text-ellipsis whitespace-nowrap max-sm:text-base text-xl'>
            Folder
          </p>
          {!isMobile && (
            <div onClick={onPrev} className='hover:brightness-0'>
              <LeftIcon width={24} height={24} />
            </div>
          )}
          <p className={TextSize({ mobile: isMobile })}>{currentNum}</p>
          {!isMobile && (
            <div onClick={onNext} className='hover:brightness-0'>
              <RightIcon width={24} height={24} />
            </div>
          )}
        </div>
        <div className='flex flex-row items-center'>
          <p className={TextSize({ mobile: isMobile })}>+ 카테고리 추가</p>
          <button className='rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors' />
        </div>
      </div>
      <hr className='border-t border-gray-300 my-4' />
    </div>
  );
};

export default CardListHeader;
