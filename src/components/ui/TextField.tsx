import { Delete } from '@/assets';
import Button from '@/components/common/Button';
import React, { useState } from 'react';
import Textarea from '../common/Textarea';

interface TextFieldProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  //eslint-disable-next-line
  onChange: (v: string) => void;
  //eslint-disable-next-line
  onSubmit?: (v: string) => void;
  // create : 생성 버튼, reset : 초기화 버튼
  type: 'create' | 'reset';
}

const TextField = ({ label, placeholder, maxLength, onChange, onSubmit, type }: TextFieldProps) => {
  const isCreateType = type === 'create';

  const [content, setContent] = useState('');

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      return;
    }
    setContent(e.target.value);
  };

  const resetContent = () => {
    setContent('');
    onChange('');
  };

  const createContent = () => {
    setContent('');
    if (onSubmit) {
      onSubmit(content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      onChange(content);
    }

    if (!isCreateType && onSubmit) {
      onSubmit(content);
    }
  };

  const handleBlur = () => {
    onChange(content);

    if (!isCreateType && onSubmit) {
      onSubmit(content);
    }
  };

  return (
    <div className='flex flex-col'>
      <p className='text-[12px] mb-2'>{label}</p>
      <div className='flex items-center relative'>
        <Textarea
          className='w-full rounded-[12px] text-[14px] p-4 pr-8'
          value={content}
          placeholder={placeholder}
          onChange={onChangeContent}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        {content && (
          <Button
            className='absolute top-3 right-3 bg-transparent hover:cursor-pointer h-6 w-6 text-xs text-primary font-semibold'
            icon={type === 'reset' ? <Delete width={24} height={24} fill='#545966' /> : null}
            onClick={isCreateType ? createContent : resetContent}
          >
            {isCreateType ? '등록' : undefined}
          </Button>
        )}
      </div>
      {maxLength && (
        <p className='text-[12px] text-grayText text-right w-full mt-1'>
          {content.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default TextField;
