import Image from '@/components/common/Image';
import { useState } from 'react';

const Example = () => {
  const [image] = useState({
    src: 'https://i.pinimg.com/236x/80/0a/91/800a91b79e242bb82000bb199dae9b5a.jpg',
    alt: '가나디',
  });
  return (
    <div className='flex flex-col items-center justify-center p-8'>
      <Image
        src={image.src}
        alt={image.alt}
        className='w-40 h-40 object-cover cursor-pointer transition duration-300 hover:scale-105'
      />
      <p className='mt-4 text-gray-700'>{image.alt}</p>
    </div>
  );
};

export default Example;
