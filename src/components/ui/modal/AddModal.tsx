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
import { createCategory } from '@/api/Category';
import { createTag } from '@/api/Tag';

interface ITag {
  tagId: number;
  tagName: string;
}

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
      console.log('🧾 카테고리 생성 응답:', res);

      const newCategoryName = res.data?.name ?? categoryName;
      setSelectedCategory(newCategoryName);
      setVisibleTag(true);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });
    },
    onError: () => {
      console.log('카테고리 생성 실패');
    },
  });

  const handleAddCategory = (content: string) => {
    categoryMutation.mutate(content);
  };

  const tagMutation = useMutation({
    mutationFn: async ({ categoryId, tagName }: { categoryId: number; tagName: string }) => {
      const res = await createTag(categoryId, tagName);
      console.log('🧾 태그 생성 응답:', res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoriesWithTags'] });
    },
    onError: () => {
      console.log('태그 생성 실패');
    },
  });

  const handleAddTag = (tagName: string) => {
    if (!categoriesWithTagsData) return;

    const selectedCategoryData = categoriesWithTagsData.find(
      (c) => c.categoryName === selectedCategory,
    );
    if (!selectedCategoryData) return;

    setSelectedTag((prev) => [...prev, tagName]);
    setVisibleMemoAndAlarm(true);

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

  const schema = modalAddSchema(isCategoryType ? 'category' : 'tag');

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
