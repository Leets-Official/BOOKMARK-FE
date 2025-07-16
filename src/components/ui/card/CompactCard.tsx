import Image from '@/components/common/Image';
import type { CompactCardProps } from '@/types';
import clsx from 'clsx';

const CompactCard = ({ title, src, memo, category, tags }: CompactCardProps) => {
  return (
    <div className='w-full border border-gray-200 shadow-md rounded-lg p-2 flex items-stretch flex-row gap-4'>
      <Image
        src={src}
        alt='CompactCard'
        className={clsx('aspect-square rounded-lg object-cover', 'h-26', 'sm:h-26', 'md:h-30')}
      />
      <div className='flex flex-col gap-2 justify-between'>
        <p className='text-base font-semibold'>{title}</p>
        <p
          className={clsx(
            'text-sm text-grayText line-clamp-2',
            'sm:line-clamp-2',
            'md:line-clamp-3',
          )}
        >
          {memo}
        </p>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-sm text-darkGray bg-snowGray rounded-lg px-2 py-1 font-medium'>
            {category}
          </p>
          <div className='flex flex-row gap-2'>
            {tags.map((tag, index) => (
              <p key={index} className='text-sm text-grayText font-medium'>
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactCard;
