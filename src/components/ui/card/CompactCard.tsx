import { AlertIcon, FolderDetailIcon } from '@/assets';
import { Button, Image } from '@/components/common';
import type { CompactCardProps } from '@/types/components/components';
import clsx from 'clsx';

const CompactCard = ({ title, image, memo, category, tags }: CompactCardProps) => {
  return (
    <div className='w-full border border-gray-200 shadow-[0px_2px_7px_rgba(2,34,94,0.1)] rounded-2xl p-2 flex items-center flex-row gap-4'>
      <div className='relative aspect-square w-[104px] md:w-[160px]'>
        <Image
          src={image}
          alt='CompactCard'
          className='absolute inset-0 w-full h-full object-cover rounded-lg'
          onClick={() => console.log('Image clicked')}
        />
        <AlertIcon width={16} height={16} stroke='white' className='absolute top-1 right-1' />
      </div>
      <div className='flex flex-col gap-2 justify-between w-full'>
        <p className='text-sm sm:text-base font-semibold line-clamp-1'>{title}</p>
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
          <div className='gap-2 flex flex-row items-center whitespace-nowrap'>
            <p className='text-[10px] text-darkGray bg-snowGray rounded-lg px-2 py-1 font-medium'>
              {category}
            </p>
            <div className='flex flex-row gap-2 '>
              {tags.map((tag, index) => (
                <p key={index} className='text-[10px] text-grayText font-medium'>
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
