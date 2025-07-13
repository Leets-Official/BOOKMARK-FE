import { DetailIcon } from '@/assets';
import TestImage from '@/assets/test.jpg';
import Chip from '@/components/common/Chip';
import Image from '@/components/common/Image';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

interface ICardProps {
  title: string;
}

const titleText = tv({
  base: 'overflow-hidden text-ellipsis whitespace-nowrap ml-1 mt-2',
  variants: {
    mobile: {
      true: 'text-[16px]',
      false: 'text-xl',
    },
  },
});

const chipInner = tv({
  base: 'flex flex-row',
  variants: {
    mobile: {
      true: 'text-[12px] gap-2',
      false: 'gap-3',
    },
  },
});

const detailIcon = tv({
  base: 'ml-auto cursor-pointer text-black hover:text-gray-500 transition-colors',
  variants: {
    mobile: {
      true: 'w-5 h-5',
      false: '',
    },
  },
});

const FolderCard = ({ title }: ICardProps) => {
  return (
    <div
      className={
        isMobile
          ? 'w-1/2 flex-shrink-0 px-2'
          : 'w-1/2 sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3'
      }
    >
      <div className='hover:scale-105 duration-300 origin-center'>
        <Image src={TestImage} className=' w-full aspect-[3/2] rounded-2xl object-cover' />
      </div>
      <p className={titleText({ mobile: isMobile })}>{title}</p>
      <div className='flex flex-row items-center ml-1 mt-1 flex-shrink-0 min-h-[28px]'>
        <div className={chipInner({ mobile: isMobile })}>
          <Chip />
          <Chip />
          <Chip />
        </div>
        <div className={detailIcon({ mobile: isMobile })}>
          <DetailIcon className={clsx(isMobile && 'w-5 h-5')} />
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
