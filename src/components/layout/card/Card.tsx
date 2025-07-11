import { DetailIcon } from '@/assets';
import TestImage from '@/assets/test.jpg';
import Chip from '@/components/common/Chip';
import Image from '@/components/common/Image';

interface ICardProps {
  title: string;
}

const Card = ({ title }: ICardProps) => {
  return (
    <div className='w-90'>
      <Image src={TestImage} className='w-90 h-60 rounded-2xl object-cover' />
      <p className='text-xl overflow-hidden text-ellipsis whitespace-nowrap mt-2'>{title}</p>
      <div className='flex flex-row justify-between items-center '>
        <Chip />
        <div className='cursor-pointer text-black hover:text-gray-500 transition-colors'>
          <DetailIcon />
        </div>
      </div>
    </div>
  );
};

export default Card;
