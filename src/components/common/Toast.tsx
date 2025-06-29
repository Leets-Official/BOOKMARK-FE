import React from 'react';
import { tv } from 'tailwind-variants';

export interface ToastProps {
  show: boolean;
  message: string;
  type?: 'positive' | 'error';
}

const toast = tv({
  base: [
    'fixed top-[80px] left-1/2 -translate-x-1/2 w-60 h-10 rounded-3xl bg-white',
    'flex items-center justify-center shadow-md',
    'text-base font-normal transition-opacity duration-300',
  ],
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
  defaultVariants: {
    type: 'positive',
    show: false,
  },
});

const Toast: React.FC<ToastProps> = ({ show, message, type }) => {
  return <div className={toast({ type, show })}>{message}</div>;
};

export default Toast;
