import Modal from '@/components/common/Modal';
import { modalAddSchema } from '@/schema/save';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from '../TextField';
import React, { useMemo, useState } from 'react';
import { suggestionListAtom, visibleMemoAndAlarmAtom, visibleTagAtom } from '@/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import type { TagProps } from '@/types/api/category';

interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryType: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTag: React.Dispatch<React.SetStateAction<string[]>>;
  categoriesWithTagsData:
    | { categoryId: number; categoryName: string; tags: TagProps[] }[]
    | undefined;
  setTempCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setTempTags: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  tempCategories: string[];
  tempTags: Record<string, string[]>;
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
  tempCategories,
  tempTags,
}: AddModalProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);
  const suggestionList = useAtomValue(suggestionListAtom);

  const handleAddCategory = (content: string) => {
    // 임시 카테고리 목록에 추가
    setTempCategories((prev) => [...prev, content]);

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
      ...prev,
      [selectedCategory]: [...(prev[selectedCategory] || []), tagName],
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

  // 서버에서 조회한 것과 임시로 만든 것 모두 검사
  const existingValues = useMemo(() => {
    if (isCategoryType) {
      const realCategory = categoriesWithTagsData?.map((c) => c.categoryName) ?? [];
      const tempCategory = tempCategories;
      return [...new Set([...realCategory, ...tempCategory])];
    } else {
      const realTag =
        categoriesWithTagsData
          ?.find((c) => c.categoryName === selectedCategory)
          ?.tags.map((t) => t.tagName) ?? [];
      const tempTag = tempTags[selectedCategory] || [];
      const suggestionTag = suggestionList.map((s) => s.content);
      return [...realTag, ...tempTag, ...suggestionTag];
    }
  }, [
    isCategoryType,
    categoriesWithTagsData,
    tempCategories,
    tempTags,
    selectedCategory,
    suggestionList,
  ]);

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
