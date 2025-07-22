import { RoundDeleteIcon } from '@/assets';
import { Button, Textarea } from '@/components/common';
import React, { useEffect, useState } from 'react';

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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (setDisabled) setDisabled(true);
    setErrorMessage('추가할 카테고리를 입력해주세요.');
  }, [setDisabled]);

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setErrorMessage('추가할 카테고리를 입력해주세요.');
      setDisabled?.(true);
    } else if (maxLength && value.length > maxLength) {
      setErrorMessage(`최대 ${maxLength}글자까지 입력가능해요`);
      setDisabled?.(true);
      return;
    } else {
      setErrorMessage('');
      setDisabled?.(false);
    }

    setContent(value);
  };

  const resetContent = () => {
    setContent('');
    setErrorMessage('');
    onChange('');
    setDisabled?.(true);
  };

  const createContent = () => {
    if (content.trim().length === 0) {
      setErrorMessage('추가할 카테고리를 입력해주세요.');
      return;
    }
    setContent('');
    setErrorMessage('');
    onSubmit?.(content);
    setDisabled?.(true);
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
      <p className='text-[12px] font-medium mb-2'>{label}</p>
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

      {errorMessage && <p className='text-[12px] text-redText mt-1 ml-1'>{errorMessage}</p>}

      {maxLength && (
        <p className='text-[12px] text-grayText text-right w-full mt-1'>
          {content.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default TextField;
