import React from 'react';
import { tv } from 'tailwind-variants';
import { CheckIcon, ErrorIcon } from '@/assets';

export interface ToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error';
}

const toast = tv({
  base: [
    'fixed top-[60px] left-1/2 -translate-x-1',
    'w-fit h-10 px-3 rounded-full',
    'flex items-center justify-center gap-1',
    'text-white text-[18px] font-semibold',
    'shadow transition-opacity duration-500',
    'z-50',
  ],
  variants: {
    type: {
      success: 'bg-[#2F3443]',
      error: 'bg-[#2F3443]',
    },
    show: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    type: 'success',
    show: false,
  },
});

const Toast: React.FC<ToastProps> = ({ show, message, type = 'success' }) => {
  const renderIcon = () => {
    if (type === 'success') {
      return (
        <div className='w-8 h-8 flex items-center justify-center rounded-full'>
          <CheckIcon className='w-8 h-8 text-green-500' style={{ background: 'transparent' }} />
        </div>
      );
    }
    if (type === 'error') {
      return (
        <div className='w-8 h-8 flex items-center justify-center rounded-full'>
          <ErrorIcon className='w-8 h-8 text-red-500' style={{ background: 'transparent' }} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={toast({ type, show })}>
      {renderIcon()}
      <span className='relative -top-[1px]'>{message}</span>
    </div>
  );
};

export default Toast;
