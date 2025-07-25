import Modal from '@/components/common/Modal';
import { modalAddSchema } from '@/schema/save';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from '../TextField';
import React, { useState } from 'react';
import { dummyCardData } from '@/contants/DummyData';
import { visibleMemoAndAlarmAtom, visibleTagAtom } from '@/atoms';
import { useSetAtom } from 'jotai';

interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryType: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTag: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddModal = ({
  setIsOpen,
  isCategoryType,
  selectedCategory,
  setSelectedCategory,
  setSelectedTag,
}: AddModalProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const setVisibleTag = useSetAtom(visibleTagAtom);
  const setVisibleMemoAndAlarm = useSetAtom(visibleMemoAndAlarmAtom);

  const handleAddCategory = (content: string) => {
    const newCategory = content;
    const template = dummyCardData[0];
    dummyCardData.push({
      ...template,
      category: newCategory,
      tags: [],
    });
    setSelectedCategory(newCategory);
    setVisibleTag(true);
  };

  const handleAddTag = (content: string) => {
    const newTag = content;
    const index = dummyCardData.findIndex((item) => item.category === selectedCategory);
    if (index !== -1) {
      dummyCardData[index].tags = [...(dummyCardData[index].tags || []), newTag];
      setSelectedTag((prev: string[]) => [...prev, newTag]);
    }
    setVisibleMemoAndAlarm(true);
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
