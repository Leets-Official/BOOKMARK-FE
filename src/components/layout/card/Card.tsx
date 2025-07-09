import TestImage from '@/assets/test.webp';
import Image from '@/components/common/Image';

const Card = () => {
  return <Image src={TestImage} className='w-50' />;
};

export default Card;
