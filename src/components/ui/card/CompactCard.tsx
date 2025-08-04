import { AlertIcon, FolderDetailIcon } from '@/assets';
import { Button, Image } from '@/components/common';
import type { CompactCardProps } from '@/types/components/components';
import { useRef, useEffect, useState } from 'react';

const CompactCard = ({ title, image, memo, category, tags }: CompactCardProps) => {
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (tagContainerRef.current) {
      const isOverflowed =
        tagContainerRef.current.scrollWidth > tagContainerRef.current.clientWidth;
      setIsOverflow(isOverflowed);
    }
  }, [tags]);

  return (
    <div className='w-full border border-gray-200 shadow-[0px_2px_7px_rgba(2,34,94,0.1)] rounded-2xl p-2 flex items-center flex-row gap-4'>
      <div className='relative aspect-square w-[104px] md:w-[160px] flex-shrink-0'>
        <Image
          src={image}
          alt='CompactCard'
          className='absolute inset-0 w-full h-full object-cover rounded-lg'
          onClick={() => console.log('Image clicked')}
        />
        <AlertIcon width={16} height={16} stroke='white' className='absolute top-1 right-1' />
      </div>
      <div className='flex flex-col gap-2 justify-between w-full min-w-0'>
        <p className='text-sm sm:text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
          {title}
        </p>
        <p className='text-sm text-grayText overflow-hidden whitespace-normal break-words line-clamp-2'>
          {memo}
        </p>
        <div className='flex flex-row items-center justify-between pr-2 overflow-hidden'>
          <div className='gap-2 flex flex-row items-center whitespace-nowrap overflow-hidden flex-1 min-w-0'>
            <p className='text-[10px] text-darkGray bg-snowGray rounded-lg px-2 py-1 font-medium flex-shrink-0'>
              {category}
            </p>
            <div
              ref={tagContainerRef}
              className='relative flex flex-row gap-2 overflow-hidden min-w-0'
            >
              {tags.map((tag, index) => (
                <p key={index} className='text-[10px] text-grayText font-medium whitespace-nowrap'>
                  {tag}
                </p>
              ))}
              {isOverflow && (
                <div className='pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/80 to-transparent' />
              )}
            </div>
          </div>
          <Button
            onClick={() => console.log('clicked')}
            icon={
              <FolderDetailIcon
                width={24}
                height={24}
                className='text-white hover:text-grayBg transition-colors w-6 h-6'
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CompactCard;
