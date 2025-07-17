import { FolderDetailIcon } from '@/assets';
import Image from '@/components/common/Image';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';

interface ICardProps {
  title: string;
}

// 제목 텍스트 스타일 (반응형)
const TitleText =
  'overflow-hidden font-sans font-semibold text-ellipsis whitespace-nowrap ml-1 md:text-xl text-base';

const FolderCard = ({ title }: ICardProps) => {
  return (
    // 모바일은 카드의 너비를 고정, PC는 반응형에 따라 비율 조정
    <div className={isMobile ? 'min-w-50 pt-2' : 'w-1/2 lg:w-1/3 xl:w-1/4 pt-3'}>
      <div className='w-full aspect-[3/2] rounded-2xl overflow-hidden flex'>
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
      <div className='flex items-center justify-between pt-2'>
        <p className={TitleText}>{title}</p>
        <FolderDetailIcon
          width={24}
          height={24}
          className={clsx(
            'text-white hover:text-grayBg transition-colors',
            isMobile ? 'w-6 h-6' : 'sm:w-10 w-8 sm:h-10 h-8',
          )}
        />
      </div>
    </div>
  );
};

export default FolderCard;
