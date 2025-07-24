import React from 'react';
import { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface TextareaProps {
  className: string;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

const Textarea = ({
  className,
  value,
  placeholder,
  onChange,
  onKeyDown,
  onBlur,
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    // TextareaAutosize을 사용하여 자동으로 높이 조절
    <TextareaAutosize
      ref={textareaRef}
      placeholder={placeholder}
      className={`${className} border border-areaBorder focus:border-blue-500 focus:ring-0 focus:ring-offset-0 focus:outline-none resize-none hide-scrollbar`}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
    />
  );
};

export default Textarea;
