import { BackArrowIcon, FolderDetailIcon } from '@/assets';
import { Button } from '@/components/common';
import { useMenuHandler } from '@/hooks/menuPosition';
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
import TagSettingChip from '../chip/TagSettingChip';
import type { CategoryWithTagProps, TagProps } from '@/types/api/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory, updateCategory } from '@/api/category/category';
import toast from 'react-hot-toast';

interface CategoryCardProps {
  color: string;
  categoryId: number;
  categoryName: string;
  tags: TagProps[];
  allCategoryNames: string[];
}

const CategoryCard = ({
  color,
  categoryId,
  categoryName,
  tags,
  allCategoryNames,
}: CategoryCardProps) => {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isMenuOpen, menuPosition, iconRef, isOpen, isClose } = useMenuHandler(); // 아이콘 기반으로 메뉴바 위치를 설정하는 커스텀 훅

  const allTagNames = tags.map((tag) => tag.tagName);

  const queryClient = useQueryClient();

  const schema = modalAddSchema('category', allCategoryNames);
  const { handleSubmit, control, reset, formState } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      category: '',
    },
  });

  // Zod 스키마 유효성 검사 결과에 따라 disabled 상태 관리
  const isDisabled = !formState.isValid || formState.isSubmitting;

  const { mutate: updateCategoryMutation } = useMutation({
    mutationFn: (categoryName: string) => updateCategory(categoryId, categoryName),
    onMutate: async (newCategoryName) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['categoriesWithTags'] });

      // 이전 데이터 백업
      const previousCategories = queryClient.getQueryData(['categoriesWithTags']);

      // 즉시 UI 업데이트 (낙관적 업데이트)
      queryClient.setQueryData(['categoriesWithTags'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((cat: CategoryWithTagProps) =>
            cat.categoryId === categoryId ? { ...cat, categoryName: newCategoryName } : cat,
          ),
        };
      });

      return { previousCategories };
    },
    onSettled: (data, error, _, context) => {
      if (data?.error || error) {
        console.log(data);
        console.log(error);
        const errorMessage = data?.error ? data.message : error?.message || '알 수 없는 오류';
        console.log('카테고리 수정 실패:', errorMessage);
        queryClient.setQueryData(['categoriesWithTags'], context?.previousCategories);
        toast.error('카테고리 수정 실패');
        return;
      }

      toast.success('카테고리 수정 완료');
      queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });

      // 검색 결과 페이지에서 카테고리 수정 시 검색 결과 다시 불러오기
      if (window.location.pathname.includes('search-result')) {
        window.dispatchEvent(new Event('bookmarkChanged'));
      }
    },
  });

  const { mutate: deleteCategoryMutation } = useMutation({
    mutationFn: (categoryId: number) => deleteCategory(categoryId),
    onMutate: async (categoryId) => {
      await queryClient.cancelQueries({ queryKey: ['categoriesWithTags'] });
      const previousCategories = queryClient.getQueryData(['categoriesWithTags']);
      queryClient.setQueryData(['categoriesWithTags'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((cat: CategoryWithTagProps) => cat.categoryId !== categoryId),
        };
      });

      return { previousCategories };
    },
    onSettled: (data, error, _, context) => {
      if (data?.error || error) {
        const errorMessage = data?.error ? data.message : error?.message || '알 수 없는 오류';
        console.log('카테고리 삭제 실패:', errorMessage);
        queryClient.setQueryData(['categoriesWithTags'], context?.previousCategories);
        toast.error('카테고리 삭제 실패');
        return;
      }

      toast.success('카테고리 삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });

      // 검색 결과 페이지에서 카테고리 수정 시 검색 결과 다시 불러오기
      if (window.location.pathname.includes('search-result')) {
        window.dispatchEvent(new Event('bookmarkChanged'));
      }
    },
  });

  const handleConfirmModal = (data: z.infer<typeof schema>) => {
    if (!data.category.trim()) return;
    updateCategoryMutation(data.category);
    setIsModalOpen(false);
    reset();
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
          <div className='w-3 h-3 rounded-[4px]' style={{ backgroundColor: color }} />
          <p className='text-base text-stone font-semibold'>{categoryName}</p>
          <p className='text-base text-primary font-semibold'>{tags.length}</p>
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
        <div
          onClick={() => setIsTagsOpen(!isTagsOpen)}
          className={clsx(
            'cursor-pointer transition-transform duration-200',
            isTagsOpen ? 'rotate-90' : 'rotate-[-90deg]',
          )}
        >
          <BackArrowIcon width={16} height={16} />
        </div>
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
            <div className='flex flex-wrap gap-2 p-0.5 mt-4'>
              {tags.map((tag) => (
                <TagSettingChip
                  key={tag.tagId}
                  tagId={tag.tagId}
                  tagName={tag.tagName}
                  allTagNames={allTagNames}
                />
              ))}
            </div>
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
        }}
        onConfirm={handleSubmit(handleConfirmModal)}
        disabled={isDisabled}
        onScrollLock={false}
      >
        <Controller
          name='category'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label='이름'
              placeholder={categoryName}
              maxLength={10}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errorMessage={fieldState.error?.message}
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
        warningText={`${categoryName} 카테고리를 정말 삭제할까요?`}
        subText={
          '카테고리를 삭제하면 해당 카테고리를 적용한 링크도 모두 삭제됩니다. 그래도 삭제할까요?'
        }
        onDelete={() => {
          setIsDeleteModalOpen(false);
          deleteCategoryMutation(categoryId);
        }}
        onScrollLock={false}
      />
    </div>
  );
};

export default CategoryCard;
