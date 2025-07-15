// components/input.tsx
import React from 'react';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  placeholder = '',
  value,
  onChange,
  className = '',
  onKeyDown,
  onBlur,
}) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

export default Input;
