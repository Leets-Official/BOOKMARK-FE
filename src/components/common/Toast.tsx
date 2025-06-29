import React from 'react';
import clsx from 'clsx';

type ToastProps = {
  show: boolean;
  message: string;
  type?: string;
};

const Toast: React.FC<ToastProps> = ({ show, message, type }) => {
  return (
    <div
      className={clsx(
        'fixed top-[80px] left-1/2 -translate-x-1/2 w-60 h-10 rounded-3xl bg-white',
        'flex items-center justify-center shadow-md text-base font-normal',
        type === 'positive'
          ? 'text-green-500 border border-green-500'
          : 'text-red-500 border border-red-500',
        'transition-opacity duration-300',
        show ? 'opacity-100' : 'opacity-0',
      )}
    >
      {message}
    </div>
  );
};

export default Toast;
