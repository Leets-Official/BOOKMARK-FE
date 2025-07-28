import { BackArrowIcon, FolderDetailIcon } from '@/assets';
import { Button } from '@/components/common';
import { useMenuHandler } from '@/hooks/MenuPosition';
import { MenuPortal, ModalPortal } from '@/utils';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import DeleteModal from '../modal/DeleteModal';
import { modalAddSchema } from '@/schema/save';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import TextField from '../TextField';

const CategoryCard = () => {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { isMenuOpen, menuPosition, iconRef, isOpen, isClose } = useMenuHandler(); // 아이콘 기반으로 메뉴바 위치를 설정하는 커스텀 훅

  const schema = modalAddSchema('category');
  const { handleSubmit, control, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      category: '',
    },
  });

  const handleConfirmModal = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <div
      className='flex flex-col gap-1 w-full px-6 py-4 rounded-[10px]'
      style={{
        boxShadow: '0 2px 7px 0 rgba(2, 34, 94, 0.1)',
      }}
    >
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div className='w-3 h-3 bg-primary rounded-[4px]' />
          <p className='text-base text-stone font-semibold'>카테고리 이름</p>
          <p className='text-base text-primary font-semibold'>15</p>
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
        <motion.div
          animate={{
            rotate: !isOpen ? 90 : -90,
          }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsTagsOpen(!isTagsOpen)}
          className='cursor-pointer'
        >
          <BackArrowIcon width={16} height={16} />
        </motion.div>
      </div>
      <AnimatePresence mode='wait'>
        {isTagsOpen && (
          <motion.div
            key='categoryContainer'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='flex flex-wrap gap-2 p-0.5'>칩</div>
          </motion.div>
        )}
      </AnimatePresence>

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
              placeholder={'카테고리 이름'}
              maxLength={10}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errorMessage={fieldState.error?.message}
              setDisabled={(disabled: boolean) => setIsDisabled(disabled)}
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
        warningText={`... 카테고리를 정말 삭제할까요?`}
        subText={`카테고리를 삭제하면 해당 카테고리를 적용한 링크도 모두 삭제됩니다. 그래도 삭제할까요?`}
        onDelete={() => {
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default CategoryCard;
