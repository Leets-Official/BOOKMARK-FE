import React from 'react';
import Input from '@/components/common/Input';
import { useState } from 'react';

const ExampleInput = () => {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-6'>
      <Input
        placeholder='내용을 입력하세요.'
        value={name}
        onChange={handleChange}
        className='border border-gray-300 rounded px-4 py-2 w-64'
      />
      <p className='text-gray-700'>
        입력한 내용: <span className='font-semibold'>{name || '없음'}</span>
      </p>
    </div>
  );
};

export default ExampleInput;
