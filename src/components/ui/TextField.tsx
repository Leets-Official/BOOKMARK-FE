import { RoundDeleteIcon } from '@/assets';
import { Button, Textarea } from '@/components/common';
import clsx from 'clsx';
import React, { useState } from 'react';

interface TextFieldProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  //eslint-disable-next-line
  onChange: (v: string) => void;
  // eslint-disable-next-line
  setDisabled?: (v: boolean) => void;
  errorMessage?: string;
  initialValue?: string;
  buttonVisible?: boolean;
}

const TextField = ({
  label,
  placeholder,
  maxLength,
  onChange,
  setDisabled,
  errorMessage,
  initialValue = '',
  buttonVisible = true,
}: TextFieldProps) => {
  const [content, setContent] = useState(initialValue);

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setDisabled?.(true);
    } else if (maxLength && value.length > maxLength) {
      setDisabled?.(true);
    } else {
      setDisabled?.(false);
    }

    setContent(value);
  };

  const resetContent = () => {
    setContent('');
    onChange('');
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
      <div className='text-xs'>{label}</div>
      <div className='flex items-center relative mt-2'>
        <Textarea
          className={clsx(
            'w-full rounded-[12px] text-15 p-4 py-3 leading-5',
            buttonVisible && 'pr-8',
          )}
          value={content}
          placeholder={placeholder}
          onChange={onChangeContent}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        {content && buttonVisible && (
          <Button
            className='absolute top-3 right-3 bg-transparent hover:cursor-pointer h-6 w-6 text-xs text-primary font-semibold'
            icon={<RoundDeleteIcon width={20} height={20} className='hover:brightness-90' />}
            onClick={resetContent}
          ></Button>
        )}
      </div>

      <div className='flex justify-between w-full whitespace-nowrap'>
        {errorMessage && <p className='text-xs text-redText mt-1 ml-1 w-full'>{errorMessage}</p>}
        {maxLength && (
          <p className='text-[12px] text-grayText text-right w-full mt-1'>
            {content.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextField;
