import React from 'react';
import Input from '@/components/common/Input';
import { useState } from 'react';

// ExampleInput 컴포넌트 정의
const ExampleInput = () => {
  // 입력값을 저장하는 상태 변수 선언
  const [name, setName] = useState('');

  // input에 입력될 때마다 호출되는 콜백 함수
  // 사용자가 입력한 값을 상태(name)에 반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-6'>
      {/* 사용자 입력을 받는 Input 컴포넌트 */}
      <Input
        placeholder='내용을 입력하세요.' // 안내 텍스트
        value={name} // 상태 값으로 제어되는 input
        onChange={handleChange} // 입력 이벤트 처리 함수 연결
        className='
          border border-gray-300                  // 테두리 스타일
          rounded                                 // 모서리 둥글게
          px-4 py-2                               // 패딩
          w-64                                    // 너비 16rem
        '
      />

      {/* 입력된 내용을 아래에 표시 */}
      <p className='text-gray-700'>
        입력한 내용:{' '}
        <span className='font-semibold'>
          {name || '없음'} {/* 아무 것도 입력하지 않았을 때는 '없음' 표시 */}
        </span>
      </p>
    </div>
  );
};

export default ExampleInput;
