import { Chip } from '@/components/common';
import { modalAddSchema } from '@/schema/save';
import { ModalPortal } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type z from 'zod';
import TextField from '../TextField';
import DeleteModal from '../modal/DeleteModal';

interface TagSettingChipProps {
  tagId: number;
  tagName: string;
  allTagNames: string[];
}

const TagSettingChip = ({ tagId, tagName, allTagNames }: TagSettingChipProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const schema = modalAddSchema('tag', allTagNames);
  const { handleSubmit, control, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      tag: '',
    },
  });

  const handleConfirmModal = (data: z.infer<typeof schema>) => {
    console.log(data);
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
          setIsDisabled(true);
        }}
        onConfirm={handleSubmit(handleConfirmModal)}
        disabled={isDisabled}
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
        }}
      />
    </div>
  );
};

export default TagSettingChip;
