import React from 'react';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className: string;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  placeholder = '',
  value,
  onChange,
  className = '',
  onKeyDown,
}) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
