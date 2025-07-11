import { DetailIcon } from '@/assets';
import TestImage from '@/assets/test.jpg';
import Chip from '@/components/common/Chip';
import Image from '@/components/common/Image';

interface ICardProps {
  title: string;
}

const Card = ({ title }: ICardProps) => {
  return (
    <div className='flex-shrink-0 basis-1/4 px-3'>
      {' '}
      {/* 핵심: basis-1/4 = 25% 너비 */}
      <div className='hover:scale-105 duration-300 origin-center'>
        <Image src={TestImage} className='w-full h-60 rounded-2xl object-cover' />
      </div>
      <p className='text-xl overflow-hidden text-ellipsis whitespace-nowrap mt-2'>{title}</p>
      <div className='flex flex-row justify-between items-center'>
        <Chip />
        <div className='cursor-pointer text-black hover:text-gray-500 transition-colors'>
          <DetailIcon />
        </div>
      </div>
    </div>
  );
};

export default Card;
