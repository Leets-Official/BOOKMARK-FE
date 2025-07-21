import { RoundDeleteIcon } from '@/assets';
import { Button, Textarea } from '@/components/common';
import React, { useState } from 'react';

interface TextFieldProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  //eslint-disable-next-line
  onChange: (v: string) => void;
  //eslint-disable-next-line
  onSubmit?: (v: string) => void;
  // create : 생성 버튼, reset : 초기화 버튼
  isCreateType?: boolean;
  // eslint-disable-next-line
  setDisabled?: (v: boolean) => void;
}

const TextField = ({
  label,
  placeholder,
  maxLength,
  onChange,
  onSubmit,
  isCreateType = false,
  setDisabled,
}: TextFieldProps) => {
  const [content, setContent] = useState('');

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) return;

    setContent(e.target.value);

    if (setDisabled) {
      if (e.target.value.length > 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  };

  const resetContent = () => {
    setContent('');
    onChange('');

    if (setDisabled) {
      setDisabled(true);
    }
  };

  const createContent = () => {
    setContent('');
    if (onSubmit) {
      onSubmit(content);
    }

    if (setDisabled) {
      setDisabled(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      onChange(content);
    }
  };

  const handleBlur = () => {
    onChange(content);
  };

  return (
    <div className='flex flex-col'>
      <p className='text-xs font-medium mb-2'>{label}</p>
      <div className='flex items-center relative'>
        <Textarea
          className='w-full rounded-[12px] text-15 p-4 pr-8'
          value={content}
          placeholder={placeholder}
          onChange={onChangeContent}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        {content && (
          <Button
            className='absolute top-3 right-3 bg-transparent hover:cursor-pointer h-6 w-6 text-xs text-primary font-semibold'
            icon={
              !isCreateType ? (
                <RoundDeleteIcon width={20} height={20} className='hover:brightness-90' />
              ) : null
            }
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
