import React from 'react';
import { tv } from 'tailwind-variants';

// props 타입 정의
export interface ToastProps {
  show: boolean;
  message: string;
  type?: 'positive' | 'error';
}

// tailwind-variants를 사용하여 toast 스타일을 구성
const toast = tv({
  // 기본 스타일 (항상 적용)
  base: [
    'fixed top-[80px] left-1/2 -translate-x-1/2 w-60 h-10 rounded-3xl bg-white',
    'flex items-center justify-center',
    'text-base font-normal transition-opacity duration-500',
  ],
  // 조건부 스타일 정의
  variants: {
    type: {
      positive: 'text-green-500 border border-green-500',
      error: 'text-red-500 border border-red-500',
    },
    show: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  // 기본 variant 설정
  defaultVariants: {
    type: 'positive',
    show: false,
  },
});

const Toast: React.FC<ToastProps> = ({ show, message, type }) => {
  return <div className={toast({ type, show })}>{message}</div>;
};

export default Toast;
