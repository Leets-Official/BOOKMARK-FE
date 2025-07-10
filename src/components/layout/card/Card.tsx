import TestImage from '@/assets/test.webp';
import Image from '@/components/common/Image';

const Card = () => {
  return <Image src={TestImage} className='w-70 h-70' />;
};

export default Card;
