import React from 'react';
import { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface TextareaProps {
  className: string;
  value: string;
  //eslint-disable-next-line
  onChange: (value: string) => void;
}

const Textarea = ({ className, value, onChange }: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextareaAutosize
      ref={textareaRef}
      className={className + 'resize-none hide-scrollbar'}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Textarea;
