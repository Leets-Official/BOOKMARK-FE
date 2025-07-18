import { FolderDetailIcon } from '@/assets';
import Image from '@/components/common/Image';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import type { SaveCardProps } from '@/types';

const SaveCard = ({ data }: { data: SaveCardProps }) => {
  return (
    <div className='mt-3 w-full relative rounded-[16px] shadow-[0_2px_7px_rgba(2,34,94,0.1)] cursor-pointer hover:border hover:border-gray-300'>
      <div className='p-4 pb-10'>
        <div className='flex flex-wrap gap-2 mb-4'>
          <span className='bg-[#80CA14] text-white font-normal px-3 py-3 rounded-full text-[15px] border-1 border-[#EAEDF5]'>
            {data.category}
          </span>
          {data.tags.map((tag, i) => (
            <span
              key={i}
              className='font-normal px-3 py-3 rounded-full text-[15px] border-1 border-[#EAEDF5]'
            >
              {tag}
            </span>
          ))}
          <span className='font-normal px-3 py-3 rounded-full text-[15px] border-1 border-[#EAEDF5]'>
            {data.platform}
          </span>
        </div>
        <Image src={data.image} className='w-full aspect-[4/2.3] object-cover rounded-xl mb-4' />
        <div className='flex justify-between items-start pl-2 pb-2'>
          <div className='flex-1'>
            <h3 className='font-semibold text-[20px] text-gray-900 mb-2'>{data.category}</h3>
            <p className='text-[15px] text-gray-600 leading-relaxed mb-2'>{data.memo}</p>
            <div className='absolute bottom-4 left-6 right-4 flex justify-between items-center'>
              <p className='text-sm text-stone'>2025.07.17 저장</p>
              <FolderDetailIcon
                width={24}
                height={24}
                className={clsx(
                  'text-white hover:text-grayBg transition-colors',
                  isMobile ? 'w-6 h-6' : 'sm:w-10 w-8 sm:h-10 h-8',
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveCard;
