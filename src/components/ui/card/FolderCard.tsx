import { FolderDetailIcon } from '@/assets';
import Image from '@/components/common/Image';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import { motion } from 'framer-motion';

interface ICardProps {
  category: string;
  images: string[];
  position?: 'left' | 'center' | 'right';
}

// 제목 텍스트 스타일 (반응형)
const TitleText =
  'overflow-hidden font-sans font-semibold text-ellipsis whitespace-nowrap ml-1 md:text-xl text-base';

const FolderCard = ({ category, images, position = 'center' }: ICardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, x: position === 'left' ? 8 : position === 'right' ? -8 : 0 }}
      transition={{ duration: 0.4 }}
      className={clsx(
        isMobile ? 'min-w-40 pt-2' : 'w-1/2 lg:w-1/3 xl:w-1/4 sm:mt-2 p-2 border-transparent ', // 모바일은 카드의 너비를 고정, PC는 반응형에 따라 비율 조정
        'rounded-2xl hover:shadow-md hover:border-1 hover:border-gray-300',
      )}
    >
      {/**카테고리에 카드가 하나만 있으면 폴더에 하나만, 두개 있으면 1 : 1 비율... 3개까지 표시 */}
      <div className='w-full aspect-[3/2] rounded-2xl overflow-hidden flex'>
        {images.length === 1 && (
          <Image src={images[0]} className='w-full h-full object-cover rounded-2xl' />
        )}

        {images.length === 2 && (
          <>
            <div className='w-1/2 h-full'>
              <Image src={images[0]} className='w-full h-full object-cover rounded-l-2xl' />
            </div>
            <div className='w-1/2 h-full'>
              <Image src={images[1]} className='w-full h-full object-cover rounded-r-2xl' />
            </div>
          </>
        )}

        {images.length >= 3 && (
          <>
            <div className='w-2/3 h-full'>
              <Image src={images[0]} className='w-full h-full object-cover rounded-l-2xl' />
            </div>
            <div className='w-1/3 h-full flex flex-col'>
              <div className='w-full h-1/2 border border-white'>
                <Image src={images[1]} className='w-full h-full object-cover' />
              </div>
              <div className='w-full h-1/2 border border-white'>
                <Image src={images[2]} className='w-full h-full object-cover rounded-br-2xl' />
              </div>
            </div>
          </>
        )}
      </div>
      <div className='flex items-center justify-between pt-2'>
        <p className={TitleText}>{category}</p>
        <FolderDetailIcon
          width={24}
          height={24}
          className={clsx(
            'text-white hover:text-grayBg transition-colors',
            isMobile ? 'w-6 h-6' : 'sm:w-10 w-8 sm:h-10 h-8',
          )}
        />
      </div>
    </motion.div>
  );
};

export default FolderCard;
