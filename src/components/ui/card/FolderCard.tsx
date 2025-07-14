import { DetailIcon } from '@/assets';
import TestImage from '@/assets/test.jpg';
import Image from '@/components/common/Image';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

interface ICardProps {
  title: string;
}

// 제목 텍스트 스타일 (반응형)
const titleText = tv({
  base: 'overflow-hidden text-ellipsis whitespace-nowrap ml-1 mt-2',
  variants: {
    mobile: {
      true: 'text-base',
      false: 'text-xl',
    },
  },
});

const FolderCard = ({ title }: ICardProps) => {
  return (
    // 모바일은 카드가 너비의 50%로 고정, PC는 반응형에 따라 비율 조정
    <div className={isMobile ? 'w-1/2 flex-shrink-0 px-2' : 'w-1/2  lg:w-1/3 xl:w-1/4 p-3'}>
      <div className='hover:scale-105 duration-300 origin-center'>
        <Image src={TestImage} className=' w-full aspect-[3/2] rounded-2xl object-cover' />
      </div>
      <p className={titleText({ mobile: isMobile })}>{title}</p>
      <div className='flex gap-3 ml-1 mt-2'>
        <p className='bg-blue-100 text-blue-700 text-sm px-3 py-2 rounded-xl'>태그</p>
        <p className='bg-blue-100 text-blue-700 text-sm  px-3 py-2 rounded-xl'>태그</p>
        <p className='bg-blue-100 text-blue-700 text-sm  px-3 py-2 rounded-xl'>태그</p>
        <div className='ml-auto cursor-pointer text-black hover:text-gray-500 transition-colors'>
          <DetailIcon className={clsx(isMobile && 'w-5 h-5')} />
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
