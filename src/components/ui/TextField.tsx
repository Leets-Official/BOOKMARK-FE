import { Delete } from '@/assets';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import React, { useState } from 'react';

interface TextFieldProps {
  label: string;
  placeholder: string;
  maxLength: number;
  //eslint-disable-next-line
  onSubmit: (v: string) => void;
}

const TextField = ({ label, placeholder, maxLength, onSubmit }: TextFieldProps) => {
  const [content, setContent] = useState('');

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxLength) {
      return;
    }
    setContent(e.target.value);
  };

  const resetContent = () => {
    setContent('');
    onSubmit('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(content);
    }
  };

  const handleBlur = () => {
    if (onSubmit) {
      onSubmit(content);
    }
  };

  return (
    <div className='flex flex-col'>
      <p className='text-[12px] mb-2'>{label}</p>
      <div className='flex items-center relative'>
        <Input
          placeholder={placeholder}
          value={content}
          onChange={onChangeContent}
          className='w-full h-12 rounded-[12px] text-[14px] p-4 border border-grayBorder focus:border-blue-500 focus:ring-0 focus:ring-offset-0 focus:outline-none'
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        {content && (
          <Button
            className='absolute right-3 bg-transparent hover:cursor-pointer h-6 w-6'
            icon={<Delete width={24} height={24} />}
            onClick={resetContent}
          />
        )}
      </div>
      <p className='text-[12px] text-grayText text-right w-full mt-1'>
        {content.length}/{maxLength}
      </p>
    </div>
  );
};

export default TextField;
