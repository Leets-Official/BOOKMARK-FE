import Modal from '@/components/common/Modal';
import { modalAddSchema } from '@/schema/save';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from '../TextField';
import React, { useState } from 'react';
import { visibleMemoAndAlarmAtom, visibleTagAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import type { ITag } from '@/types/api/categoryAndTag';

interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryType: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTag: React.Dispatch<React.SetStateAction<string[]>>;
  categoriesWithTagsData: { categoryId: number; categoryName: string; tags: ITag[] }[] | undefined;
  setTempCategories: React.Dispatch<React.SetStateAction<{ id: string; content: string }[]>>;
  setTempTags: React.Dispatch<React.SetStateAction<{ categoryName: string; tags: string[] }>>;
}

const AddModal = ({
  setIsOpen,
  isCategoryType,
  selectedCategory,
  setSelectedCategory,
  setSelectedTag,
  categoriesWithTagsData,
  setTempCategories,
  setTempTags,
}: AddModalProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);

  const handleAddCategory = (content: string) => {
    // 임시 카테고리 목록에 추가
    const tempId = `temp_${Date.now()}`;
    setTempCategories((prev) => [...prev, { id: tempId, content }]);

    // 새로 추가한 카테고리를 바로 선택
    setSelectedCategory(content);
    setVisibleTag(true);
  };

  const handleAddTag = (tagName: string) => {
    if (!selectedCategory) return;

    setSelectedTag((prev) => [...prev, tagName]);
    setVisibleMemoAndAlarm(true);

    // 임시 태그 목록에 추가
    setTempTags((prev) => ({
      categoryName: selectedCategory,
      tags: [...(prev.categoryName === selectedCategory ? prev.tags : []), tagName],
    }));
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
