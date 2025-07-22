import { FolderDetailIcon } from '@/assets';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import type { CompactCardProps } from '@/types';
import clsx from 'clsx';

const CompactCard = ({ title, image, memo, category, tags }: CompactCardProps) => {
  return (
    <div className='w-full border border-gray-200 shadow-md rounded-lg p-2 flex items-stretch flex-row gap-4'>
      <Image
        src={image}
        alt='CompactCard'
        className={clsx('aspect-square rounded-lg object-cover', 'h-26', 'sm:h-26', 'md:h-30')}
      />
      <div className='flex flex-col gap-2 justify-between w-full'>
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
        <div className='flex flex-row items-center justify-between pr-2'>
          <div className='gap-2 flex flex-row items-center'>
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
