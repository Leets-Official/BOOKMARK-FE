import { DetailIcon } from '@/assets';
import TestImage from '@/assets/test.jpg';
import Chip from '@/components/common/Chip';
import Image from '@/components/common/Image';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';

interface ICardProps {
  title: string;
}

const FolderCard = ({ title }: ICardProps) => {
  return (
    <div className={clsx(isMobile ? 'min-w-40 mr-4' : 'min-w-95 px-3')}>
      <div className='hover:scale-105 duration-300 origin-center'>
        <Image src={TestImage} className='w-full h-full rounded-2xl object-cover' />
      </div>
      <p
        className={clsx(
          'text-xl overflow-hidden text-ellipsis whitespace-nowrap ml-1 mt-2',
          isMobile && 'text-[16px]',
        )}
      >
        {title}
      </p>
      <div className='flex flex-row items-center ml-1 mt-1'>
        <div className={clsx('flex flex-row', isMobile ? 'text-[12px] gap-2' : 'gap-3')}>
          <Chip />
          <Chip />
          <Chip />
        </div>
        <div className='ml-auto cursor-pointer text-black hover:text-gray-500 transition-colors'>
          <DetailIcon className={clsx(isMobile && 'w-5 h-5')} />
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
