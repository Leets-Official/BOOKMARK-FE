import { FolderDetailIcon } from '@/assets';
import Image from '@/components/common/Image';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import { motion } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';
import FolderMenuPortal from '@/utils/FolderMenuPortal';
import type React from 'react';

interface ICardProps {
  category: string;
  images: string[];
}

// 제목 텍스트 스타일 (반응형)
const TitleText =
  'overflow-hidden font-sans font-semibold text-ellipsis whitespace-nowrap ml-1 md:text-xl text-base';

const FolderCard = ({ category, images }: ICardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const updateMenuPosition = useCallback(() => {
    if (iconRef.current && isMenuOpen) {
      const rect = iconRef.current.getBoundingClientRect();
      setMenuPosition({
        x: rect.right - 136,
        y: rect.bottom + 4,
      });
    }
  }, [isMenuOpen]);

  // 리사이즈 및 스크롤 이벤트 리스너 등록
  useEffect(() => {
    if (!isMenuOpen) return;

    // ResizeObserver를 사용하여 화면 크기 변화 감지
    const resizeObserver = new ResizeObserver(() => {
      updateMenuPosition();
    });

    resizeObserver.observe(document.body);
    window.addEventListener('resize', updateMenuPosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMenuPosition);
    };
  }, [isMenuOpen, updateMenuPosition]);

  // 아이콘 기준 메뉴창 열기
  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setMenuPosition({
        x: rect.right - 136,
        y: rect.bottom + 4,
      });
    }
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const shouldHoverEffect = isMenuOpen;

  return (
    <>
      <motion.div
        // 메뉴바 떠 있다면 hover상태 강제 적용 (모바일 제외)
        animate={{ scale: shouldHoverEffect && !isMobile ? 1.03 : 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className={clsx(
          isMobile ? 'min-w-40 pt-2' : 'w-1/2 lg:w-1/3 xl:w-1/4 sm:mt-2 p-2 border-transparent ', // 모바일은 카드의 너비를 고정, PC는 반응형에 따라 비율 조정
          'rounded-2xl',
          !isMobile && 'hover:shadow-md hover:border-1 hover:border-gray-300',
          shouldHoverEffect && !isMobile && 'shadow-md border-1 border-gray-300',
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
          <div ref={iconRef} onClick={handleIconClick}>
            <FolderDetailIcon
              width={24}
              height={24}
              className={clsx(
                'hover:text-grayBg transition-colors cursor-pointer',
                isMobile ? 'w-6 h-6' : 'sm:w-10 w-8 sm:h-10 h-8',
                shouldHoverEffect ? 'text-grayBg' : 'text-white',
              )}
            />
          </div>
        </div>
      </motion.div>
      {/* Portal로 렌더링되는 메뉴 */}
      <FolderMenuPortal isOpen={isMenuOpen} onClose={handleMenuClose} position={menuPosition}>
        <div className='flex flex-col w-32'>
          <p className='text-left px-1 mb-2 text-[#A4A8B2] rounded text-xs'>카테고리 설정</p>
          <button className='text-left px-1 py-3 text-stone hover:bg-gray-100 rounded text-15'>
            이름 수정
          </button>
          <button className='text-left px-1 py-3 text-[#FF2C3D] hover:bg-gray-100 rounded text-15'>
            삭제
          </button>
        </div>
      </FolderMenuPortal>
    </>
  );
};

export default FolderCard;
