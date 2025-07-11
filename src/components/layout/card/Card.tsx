import { DetailIcon } from '@/assets';
import TestImage from '@/assets/test.jpg';
import Chip from '@/components/common/Chip';
import Image from '@/components/common/Image';

const Card = () => {
  return (
    <div className='w-90'>
      <Image src={TestImage} className='w-90 h-60 rounded-2xl object-cover' />
      <p className='text-xl overflow-hidden text-ellipsis whitespace-nowrap'>제목제목제목</p>
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
