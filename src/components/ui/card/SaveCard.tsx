import { AlertIcon, FolderDetailIcon } from '@/assets';
import { Image, Chip, Button } from '@/components/common';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import type { SaveCardProps } from '@/types/components/components';
import { motion } from 'framer-motion';
import { MenuPortal } from '@/utils/';
import { useMenuHandler } from '@/hooks/MenuPosition';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../modal/DeleteModal';
import { useState } from 'react';

const SaveCard = ({ data }: { data: SaveCardProps }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isMenuOpen, menuPosition, iconRef, isOpen, isClose } = useMenuHandler();
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        animate={{ scale: isMenuOpen && !isMobile ? 1.03 : 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className={clsx(
          'mt-3 w-full relative rounded-[16px] shadow-[0_2px_7px_rgba(2,34,94,0.1)] cursor-pointer',
          !isMobile && 'hover:border hover:border-gray-300',
          isMenuOpen &&
          !isMobile &&
          'shadow-[0_2px_7px_rgba(2,34,94,0.1)] border border-gray-300 hover:border hover:border-gray-300',
        )}
      >
        <div className='p-3.5 pb-10'>
          <div className='flex flex-wrap gap-2 mb-4'>
            <Chip
              content={data.category}
              isSelected={false}
              className='bg-[#80CA14] text-white border-[#EAEDF5] text-[15px] px-3 h-[40px]'
            />
            {data.tags.map((tag, i) => (
              <Chip
                key={i}
                content={tag}
                isSelected={false}
                className='border-[#EAEDF5] text-[15px] px-3 h-[36px]'
              />
            ))}
            <Chip
              content={data.platform}
              isSelected={false}
              className='border-blue text-[15px] px-3 h-[36px]'
            />
          </div>
          <Image src={data.image} className='w-full aspect-[4/2.3] object-cover rounded-xl mb-4' />
          <div className='flex justify-between items-start pl-2 pb-2'>
            <div className='flex-1'>
              <h3 className='font-semibold text-[20px] text-gray-900 mb-2'>{data.title}</h3>
              <p className='text-[15px] text-gray-600 leading-relaxed mb-2'>{data.memo}</p>
              <div className='absolute bottom-4 left-6 right-4 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <p className='text-sm text-stone'>2025.07.17 18:28 저장</p>
                  <AlertIcon width={16} height={16} />
                </div>

                <div ref={iconRef} onClick={isOpen}>
                  <FolderDetailIcon
                    width={24}
                    height={24}
                    className={clsx(
                      'text-white hover:text-grayBg transition-colors',
                      isMobile ? 'w-6 h-6' : 'sm:w-10 w-8 sm:h-10 h-8',
                      isMenuOpen ? 'text-grayBg' : 'text-white',
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <MenuPortal isOpen={isMenuOpen} onClose={isClose} position={menuPosition}>
        <div className='flex flex-col w-32'>
          <p className='text-left px-1 mb-2 text-[#A4A8B2] rounded text-xs'>링크 설정</p>
          <Button
            onClick={() => {
              isClose();
              navigate(`edit/${data.id}`);
            }}
            className='text-left px-1 py-3 text-stone hover:bg-gray-100 rounded text-15 cursor-pointer'
          >
            수정
          </Button>
          <Button
            onClick={() => {
              isClose();
              setIsDeleteModalOpen(true);
            }}
            className='text-left px-1 py-3 text-[#FF2C3D] hover:bg-gray-100 rounded text-15 cursor-pointer'
          >
            삭제
          </Button>
        </div>
      </MenuPortal>
      {/**삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        warningText={`"${data.category}"카테고리를 정말 삭제할까요?`}
        onDelete={() => {
          setIsDeleteModalOpen(false);
          console.log('삭제:', data.category);
        }}
      />
    </>
  );
};

export default SaveCard;
