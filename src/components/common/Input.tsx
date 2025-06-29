// components/input.tsx
import React from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fontSize?: string;
  textColor?: string;
  bgColor?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder = '',
  value,
  onChange,
  fontSize = 'text-base',
  textColor = 'text-black',
  bgColor = 'bg-white',
}) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-lg outline-none border-gray-300 ${fontSize} ${textColor} ${bgColor}`}
    />
  );
};

export default Input;
