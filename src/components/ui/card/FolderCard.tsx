import { DetailIcon } from '@/assets';
import Image from '@/components/common/Image';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import Chip from '@/components/common/Chip';

interface ICardProps {
  title: string;
}

// 제목 텍스트 스타일 (반응형)
const titleText = tv({
  base: 'overflow-hidden text-ellipsis whitespace-nowrap ml-1 mt-2 sm:text-xl text-base',
  variants: {
    mobile: {
      true: 'text-base',
      false: 'text-xl',
    },
  },
});

const FolderCard = ({ title }: ICardProps) => {
  const chupList = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    title: `태그 ${i + 1}`,
    isSelected: 'true',
  }));

  return (
    // 모바일은 카드의 너비를 고정, PC는 반응형에 따라 비율 조정
    <div className={isMobile ? 'min-w-42 px-2' : 'w-1/2 lg:w-1/3 xl:w-1/4 p-3'}>
      <div className='w-full aspect-[3/2] rounded-2xl overflow-hidden hover:scale-105 duration-300 flex'>
        <div className='w-2/3 h-full'>
          <Image
            src='https://picsum.photos/200/300'
            className='w-full h-full object-cover rounded-l-2xl'
          />
        </div>
        <div className='w-1/3 h-full flex flex-col'>
          <div className='w-full h-1/2 border border-white'>
            <Image
              src='https://picsum.photos/id/237/300/200'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-full h-1/2 border border-white'>
            <Image
              src='https://picsum.photos/200/300?grayscale'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
      <p className={titleText({ mobile: true })}>{title}</p>
      <div className='relative mt-2 pt-2'>
        <div className='absolute top-0 right-0 ml-50 cursor-pointer text-black hover:text-gray-500 transition-colors'>
          <DetailIcon className={clsx(isMobile && 'w-5 h-5')} />
        </div>
        <div className='flex flex-wrap flex-row gap-2 mr-8 p-1'>
          {chupList.map((chip) => (
            <Chip key={chip.id} content={chip.title} isSelected={true} type='suggestion' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
