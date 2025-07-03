// components/input.tsx
import React from 'react';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className: string;
}

const Input: React.FC<InputProps> = ({ placeholder = '', value, onChange, className = '' }) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default Input;
