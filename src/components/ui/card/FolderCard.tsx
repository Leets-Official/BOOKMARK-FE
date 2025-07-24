import { FolderDetailIcon } from '@/assets';
import { Image, Button } from '@/components/common';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import { motion } from 'framer-motion';
import { MenuPortal, ModalPortal } from '@/utils';
import { useMenuHandler } from '@/hooks/MenuPosition';
import { useState } from 'react';
import DeleteModal from '../modal/DeleteModal';
import TextField from '../TextField';
import { modalAddSchema } from '@/schema/save';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { Controller, useForm } from 'react-hook-form';

interface ICardProps {
  category: string;
  images: string[];
}

// 제목 텍스트 스타일 (반응형)
const TitleText =
  'overflow-hidden font-sans font-semibold text-ellipsis whitespace-nowrap ml-1 md:text-xl text-base';

const FolderCard = ({ category, images }: ICardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isMenuOpen, menuPosition, iconRef, isOpen, isClose } = useMenuHandler(); // 아이콘 기반으로 메뉴바 위치를 설정하는 커스텀 훅
  const [isDisabled, setIsDisabled] = useState(true);

  const schema = modalAddSchema('category');

  const { handleSubmit, control, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: '',
    },
  });

  const handleConfirmModal = (data: z.infer<typeof schema>) => {
    if (!data.category.trim()) return;
    console.log('카테고리 수정됨:', data.category);
    setIsModalOpen(false);
    reset();
    setIsDisabled(true);
  };

  return (
    <>
      <motion.div
        // 메뉴바 떠 있다면 hover상태 강제 적용 (모바일 제외)
        animate={{ scale: isMenuOpen && !isMobile ? 1.03 : 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className={clsx(
          isMobile
            ? 'min-w-40 pt-2'
            : 'w-1/2 lg:w-1/3 xl:w-1/4 sm:mt-2 p-2 hover:shadow-[0_2px_7px_rgba(2,34,94,0.1)] hover:border-gray-300 rounded-2xl',
          isMenuOpen && !isMobile
            ? 'border border-gray-300 shadow-[0_2px_7px_rgba(2,34,94,0.1)]'
            : 'border border-transparent',
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
              <div className='w-2/3 h-full flex flex-col'>
                <div className='w-full h-1/2 border-l border-b border-white'>
                  <Image src={images[1]} className='w-full h-full object-cover' />
                </div>
                <div className='w-full h-1/2 border-l border-white'>
                  <Image src={images[2]} className='w-full h-full object-cover rounded-br-2xl' />
                </div>
              </div>
            </>
          )}
        </div>
        <div className='flex items-center justify-between pt-2'>
          <p className={TitleText}>{category}</p>
          <div ref={iconRef} onClick={isOpen}>
            <FolderDetailIcon
              width={24}
              height={24}
              className={clsx(
                'hover:text-grayBg transition-colors cursor-pointer',
                isMobile ? 'w-6 h-6' : 'sm:w-10 w-8 sm:h-10 h-8',
                isMenuOpen ? 'text-grayBg' : 'text-white',
              )}
            />
          </div>
        </div>
      </motion.div>
      {/* Portal로 렌더링되는 메뉴 */}
      <MenuPortal isOpen={isMenuOpen} onClose={isClose} position={menuPosition}>
        <div className='flex flex-col w-32'>
          <p className='text-left px-1 mb-2 text-[#A4A8B2] rounded text-xs'>카테고리 설정</p>
          <Button
            onClick={() => {
              isClose();
              setIsModalOpen(true);
            }}
            className='text-left px-1 py-3 text-stone hover:bg-gray-100 rounded text-15'
          >
            카테고리 수정
          </Button>
        </div>
      </MenuPortal>
      {/* 모달 포탈 */}
      <ModalPortal
        isOpen={isModalOpen}
        title='카테고리 수정'
        confirmLabel='저장하기'
        onCancel={() => {
          setIsModalOpen(false);
          reset();
          setIsDisabled(true);
        }}
        onConfirm={handleSubmit(handleConfirmModal)}
        disabled={isDisabled}
      >
        <Controller
          name='category'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label='이름'
              placeholder={category}
              maxLength={10}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errorMessage={fieldState.error?.message}
              setDisabled={(disabled) => setIsDisabled(disabled)}
            />
          )}
        />
        <div className='text-xs mt-3'>
          <p>작업</p>
          <div
            onClick={() => {
              setIsModalOpen(false);
              setIsDeleteModalOpen(true);
            }}
            className='hover:bg-gray-100 rounded mt-1.5 p-1 cursor-pointer'
          >
            <p className='text-base font-semibold mb-1.5'>카테고리 삭제</p>
            <p className='text-xs text-stone break-keep whitespace-pre-wrap'>
              카테고리를 삭제하면 해당 카테고리를 적용한 링크도 모두 삭제됩니다. 그래도 삭제할까요?
            </p>
          </div>
        </div>
      </ModalPortal>
      {/**삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        warningText={`"${category}"카테고리를 정말 삭제할까요?`}
        onDelete={() => {
          setIsDeleteModalOpen(false);
          console.log('삭제:', category);
        }}
      />
    </>
  );
};

export default FolderCard;
