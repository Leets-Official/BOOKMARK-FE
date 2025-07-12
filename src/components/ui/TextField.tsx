import { Delete } from '@/assets';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import React, { useState } from 'react';
import Textarea from '../common/Textarea';

interface TextFieldProps {
  label: string;
  placeholder: string;
  maxLength: number;
  //eslint-disable-next-line
  onSubmit: (v: string) => void;
  type: 'create' | 'reset';
}

const TextField = ({ label, placeholder, maxLength, onSubmit, type }: TextFieldProps) => {
  const [content, setContent] = useState('');

  const onChangeContent = (value: string) => {
    if (value.length > maxLength) {
      return;
    }
    setContent(value);
  };

  const resetContent = () => {
    setContent('');
    onSubmit('');
  };

  const createContent = () => {
    setContent('');
    onSubmit(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit && type === 'reset') {
      onSubmit(content);
    }
  };

  const handleBlur = () => {
    if (onSubmit && type === 'reset') {
      onSubmit(content);
    }
  };

  return (
    <div className='flex flex-col'>
      <p className='text-[12px] mb-2'>{label}</p>
      <div className='flex items-center relative'>
        {/* <Input
          placeholder={placeholder}
          value={content}
          onChange={onChangeContent}
          className='w-full h-12 rounded-[12px] text-[14px] p-4 border border-grayBorder focus:border-blue-500 focus:ring-0 focus:ring-offset-0 focus:outline-none'
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        /> */}
        {content && (
          <Button
            className='absolute top-3 right-3 bg-transparent hover:cursor-pointer h-6 w-6 text-xs text-primary font-semibold'
            icon={type === 'reset' ? <Delete width={24} height={24} fill='#545966' /> : null}
            onClick={type === 'create' ? createContent : resetContent}
          >
            {type === 'create' ? '등록' : undefined}
          </Button>
        )}
        <Textarea
          className='w-full rounded-[12px] text-[14px] p-4 border border-grayBorder focus:border-blue-500 focus:ring-0 focus:ring-offset-0 focus:outline-none resize-none hide-scrollbar'
          value={content}
          onChange={onChangeContent}
        />
      </div>
      <p className='text-[12px] text-grayText text-right w-full mt-1'>
        {content.length}/{maxLength}
      </p>
    </div>
  );
};

export default TextField;
