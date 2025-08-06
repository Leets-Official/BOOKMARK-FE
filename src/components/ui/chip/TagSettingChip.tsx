import { Chip } from '@/components/common';
import { modalAddSchema } from '@/schema/save';
import { ModalPortal } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type z from 'zod';
import TextField from '../TextField';
import DeleteModal from '../modal/DeleteModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTag } from '@/api/tag/tag';
import { deleteTag } from '@/api/tag/tag';
import toast from 'react-hot-toast';
import type { CategoryWithTagProps, TagProps } from '@/types/api/category';

interface TagSettingChipProps {
  tagId: number;
  tagName: string;
  allTagNames: string[];
}

const TagSettingChip = ({ tagId, tagName, allTagNames }: TagSettingChipProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const schema = modalAddSchema('tag', allTagNames);
  const { handleSubmit, control, reset, formState } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      tag: '',
    },
  });

  const queryClient = useQueryClient();
  // Zod 스키마 유효성 검사 결과에 따라 disabled 상태 관리
  const isDisabled = !formState.isValid || formState.isSubmitting;

  const { mutate: updateTagMutation } = useMutation({
    mutationFn: (tagName: string) => updateTag(tagId, tagName),
    onMutate: async (newTagName) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['categoriesWithTags'] });

      // 이전 데이터 백업
      const previousCategories = queryClient.getQueryData(['categoriesWithTags']);

      // 즉시 UI 업데이트 (낙관적 업데이트)
      queryClient.setQueryData(['categoriesWithTags'], (old: any) => {
        if (!old?.data) return old;

        console.log('낙관적 업데이트 전:', old.data);

        const updatedData = {
          ...old,
          data: old.data.map((category: CategoryWithTagProps) => ({
            ...category,
            tags: category.tags.map((tag: TagProps) =>
              tag.tagId === tagId ? { ...tag, tagName: newTagName } : tag,
            ),
          })),
        };

        console.log('낙관적 업데이트 후:', updatedData.data);
        return updatedData;
      });

      return { previousCategories };
    },
    onSettled: (data, error, _, context) => {
      if (data?.error || error) {
        console.log(data);
        console.log(error);
        const errorMessage = data?.error ? data.message : error?.message || '알 수 없는 오류';
        console.log('태그 수정 실패:', errorMessage);
        queryClient.setQueryData(['categoriesWithTags'], context?.previousCategories);
        toast.error('태그 수정 실패');
        return;
      }

      toast.success('태그 수정 완료');
      queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });

      // 검색 결과 페이지에서 태그 수정 시 검색 결과 다시 불러오기
      if (window.location.pathname.includes('search-result')) {
        window.dispatchEvent(new Event('bookmarkChanged'));
      }
    },
  });

  const { mutate: deleteTagMutation } = useMutation({
    mutationFn: (tagId: number) => deleteTag(tagId),
    onMutate: async (tagId) => {
      await queryClient.cancelQueries({ queryKey: ['categoriesWithTags'] });
      const previousCategories = queryClient.getQueryData(['categoriesWithTags']);
      queryClient.setQueryData(['categoriesWithTags'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((category: CategoryWithTagProps) => ({
            ...category,
            tags: category.tags.filter((tag: TagProps) => tag.tagId !== tagId),
          })),
        };
      });

      return { previousCategories };
    },
    onSettled: (data, error, _, context) => {
      if (data?.error || error) {
        const errorMessage = data?.error ? data.message : error?.message || '알 수 없는 오류';
        console.log('태그 삭제 실패:', errorMessage);
        queryClient.setQueryData(['categoriesWithTags'], context?.previousCategories);
        toast.error('태그 삭제 실패');
        return;
      }

      toast.success('태그 삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });

      // 검색 결과 페이지에서 태그 삭제 시 검색 결과 다시 불러오기
      if (window.location.pathname.includes('search-result')) {
        window.dispatchEvent(new Event('bookmarkChanged'));
      }
    },
  });

  const handleConfirmModal = (data: z.infer<typeof schema>) => {
    if (!data.tag.trim()) return;

    console.log('태그 수정 시작:', data.tag);
    updateTagMutation(data.tag);

    // 임시로 즉시 UI 업데이트 확인
    setTimeout(() => {
      const currentData = queryClient.getQueryData(['categoriesWithTags']);
      console.log('수정 후 캐시 데이터:', currentData);
    }, 100);

    setIsModalOpen(false);
    setIsSelected(false);
    reset();
  };

  return (
    <div>
      <Chip
        content={tagName}
        isSelected={isSelected}
        onClick={() => {
          setIsSelected(true);
          setIsModalOpen(true);
        }}
        onSetting={() => {
          setIsSelected(true);
          setIsModalOpen(true);
        }}
        className='text-15 bg-white border border-lightGrayBlue'
        selectedClassName='text-15 bg-lightPrimary text-primary border-primary'
      />
      {/* 모달 포탈 */}
      <ModalPortal
        isOpen={isModalOpen}
        title='태그 수정'
        confirmLabel='저장하기'
        onCancel={() => {
          setIsSelected(false);
          setIsModalOpen(false);
          reset();
        }}
        onConfirm={handleSubmit(handleConfirmModal)}
        disabled={isDisabled}
        onScrollLock={false}
      >
        <Controller
          name='tag'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label='이름'
              placeholder={tagName}
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
            <p className='text-base font-semibold mb-1.5'>태그 삭제</p>
          </div>
        </div>
      </ModalPortal>
      {/**삭제 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        warningText={`${tagName} 태그를 삭제할까요?`}
        subText={'삭제시 태그만 삭제되며, 링크는 남아있습니다'}
        onDelete={() => {
          setIsDeleteModalOpen(false);
          deleteTagMutation(tagId);
        }}
        onScrollLock={false}
      />
    </div>
  );
};

export default TagSettingChip;
