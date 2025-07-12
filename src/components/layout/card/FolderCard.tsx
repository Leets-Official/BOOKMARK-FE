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
    <div className='min-w-95 px-3'>
      <div className='hover:scale-105 duration-300 origin-center'>
        <Image src={TestImage} className='w-full h-60 rounded-2xl object-cover' />
      </div>
      <p className='text-xl overflow-hidden text-ellipsis whitespace-nowrap mt-2'>{title}</p>
      <div className='flex flex-row items-center mt-1'>
        <div className='flex flex-row gap-3'>
          <Chip />
          <Chip />
          <Chip />
        </div>
        <div className='ml-auto cursor-pointer text-black hover:text-gray-500 transition-colors'>
          <DetailIcon />
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
