import Modal from '@/components/common/Modal';
import { modalAddSchema } from '@/schema/save';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from '../TextField';
import React, { useState } from 'react';
import { visibleMemoAndAlarmAtom, visibleTagAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '@/api/category/category';
import { createTag } from '@/api/tag/tag';
import type { ITag } from '@/types/api/categoryAndTag';

interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryType: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTag: React.Dispatch<React.SetStateAction<string[]>>;
  categoriesWithTagsData: { categoryId: number; categoryName: string; tags: ITag[] }[] | undefined;
}

const AddModal = ({
  setIsOpen,
  isCategoryType,
  selectedCategory,
  setSelectedCategory,
  setSelectedTag,
  categoriesWithTagsData,
}: AddModalProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);

  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: async (categoryName: string) => {
      const res = await createCategory(categoryName);
      if (res.error) throw new Error(res.message);
      return res.data;
    },
    onSuccess: (categoryName) => {
      queryClient.refetchQueries({ queryKey: ['categoriesWithTags'] }); // 새로고침 하지 않아도 즉시 반영

      const newCategoryName = categoryName;
      if (newCategoryName !== categoryName) {
        setSelectedCategory(newCategoryName);
      }
    },
    onError: () => {
      console.log('카테고리 생성 실패');
      setSelectedCategory('');
      setVisibleTag(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] }); // 다음에 해당 데이터를 사용할때 자동으로 최신화
    },
  });

  const handleAddCategory = (content: string) => {
    // 즉시 UI 업데이트
    setSelectedCategory(content);
    setVisibleTag(true);

    // 캐시에 임시로 새 카테고리 추가
    queryClient.setQueryData(['categoriesWithTags'], (oldData: any) => {
      if (!oldData) return [];
      return [
        ...oldData,
        {
          categoryId: Date.now(), // 임시 ID
          categoryName: content,
          createdAt: new Date().toISOString(),
          tags: [],
        },
      ];
    });

    // 서버 요청
    categoryMutation.mutate(content);
  };

  const tagMutation = useMutation({
    mutationFn: async ({ categoryId, tagName }: { categoryId: number; tagName: string }) => {
      const res = await createTag(categoryId, tagName);
      return res;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['categoriesWithTags'] });
    },
    onError: () => {
      console.log('태그 생성 실패');
      setVisibleMemoAndAlarm(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] }); // 다음에 해당 데이터를 사용할때 자동으로 최신화
    },
  });

  const handleAddTag = (tagName: string) => {
    if (!categoriesWithTagsData) return;

    const selectedCategoryData = categoriesWithTagsData.find(
      (c) => c.categoryName === selectedCategory,
    );
    if (!selectedCategoryData) return;

    // 즉시 UI 업데이트
    setSelectedTag((prev) => [...prev, tagName]);
    setVisibleMemoAndAlarm(true);

    // 캐시에 임시로 새 태그 추가
    queryClient.setQueryData(['categoriesWithTags'], (oldData: any) => {
      if (!oldData) return oldData;
      return oldData.map((category: any) => {
        if (category.categoryId === selectedCategoryData.categoryId) {
          return {
            ...category,
            tags: [
              ...category.tags,
              {
                tagId: Date.now(), // 임시 ID
                tagName: tagName,
              },
            ],
          };
        }
        return category;
      });
    });

    // 서버 요청
    tagMutation.mutate({
      categoryId: selectedCategoryData.categoryId,
      tagName,
    });
  };

  const handleConfirmModal = (data: z.infer<typeof schema>) => {
    if (isCategoryType) {
      if (!data.category.trim()) return;
      handleAddCategory(data.category);
    } else {
      if (!data.tag.trim()) return;
      handleAddTag(data.tag);
    }
    setIsOpen(false);
    reset();
    setIsDisabled(true);
  };

  const existingValues = isCategoryType
    ? (categoriesWithTagsData?.map((c) => c.categoryName) ?? [])
    : (categoriesWithTagsData
        ?.find((c) => c.categoryName === selectedCategory)
        ?.tags.map((t) => t.tagName) ?? []);

  const schema = modalAddSchema(isCategoryType ? 'category' : 'tag', existingValues);

  const { handleSubmit, control, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      category: '',
      tag: '',
    },
  });

  return (
    <Modal
      title={isCategoryType ? '카테고리 추가' : '태그 추가'}
      confirmLabel='저장하기'
      onCancel={() => {
        setIsOpen(false);
        reset();
        setIsDisabled(true);
      }}
      onConfirm={() => {
        handleSubmit(handleConfirmModal)();
      }}
      disabled={isDisabled}
    >
      <Controller
        name={isCategoryType ? 'category' : 'tag'}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label={isCategoryType ? '카테고리' : '태그'}
            placeholder={
              isCategoryType ? '추가할 카테고리를 입력해주세요' : '추가할 태그을 입력해주세요'
            }
            maxLength={10}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={fieldState.error?.message}
            setDisabled={(disabled) => setIsDisabled(disabled)}
          />
        )}
      />
    </Modal>
  );
};

export default AddModal;
