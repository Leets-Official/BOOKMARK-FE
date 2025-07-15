import { DetailIcon } from '@/assets';
import Image from '@/components/common/Image';
import { isMobile } from 'react-device-detect';
import { tv } from 'tailwind-variants';

interface ICardProps {
  title: string;
}

// 제목 텍스트 스타일 (반응형)
const titleText = tv({
  base: 'overflow-hidden font-sans text-ellipsis whitespace-nowrap ml-1 sm:text-xl text-base',
  variants: {
    mobile: {
      true: 'text-base',
      false: 'text-xl',
    },
  },
});

const FolderCard = ({ title }: ICardProps) => {
  const isMobile = 'true';
  return (
    // 모바일은 카드의 너비를 고정, PC는 반응형에 따라 비율 조정
    <div className={isMobile ? 'min-w-42 px-2' : 'w-1/2 lg:w-1/3 xl:w-1/4 p-3'}>
      <div className='w-full aspect-[3/2] rounded-2xl overflow-hidden hover:scale-105 duration-300 flex'>
        <div className='w-2/3 h-full'>
          <Image
            src='https://cdn.pixabay.com/photo/2021/03/18/19/56/keyboard-6105750_960_720.jpg'
            className='w-full h-full object-cover rounded-l-2xl'
          />
        </div>
        <div className='w-1/3 h-full flex flex-col'>
          <div className='w-full h-1/2 border border-white'>
            <Image
              src='https://cdn.pixabay.com/photo/2017/04/23/19/30/earth-2254769_1280.jpg'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-full h-1/2 border border-white'>
            <Image
              src='https://cdn.pixabay.com/photo/2021/10/11/17/54/technology-6701504_1280.jpg'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
      <div className='relative mt-2 pr-4'>
        <p className={titleText({ mobile: true })}>{title}</p>
        <div className='absolute top-0 right-0 cursor-pointer hover:text-gray-500 transition-colors'>
          <DetailIcon width={isMobile ? 20 : 28} height={isMobile ? 20 : 28} />
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
