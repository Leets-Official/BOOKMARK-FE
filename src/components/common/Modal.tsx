import { Delete } from '@/assets';
import Button from './Button';
import type React from 'react';

interface ModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, onConfirm, onCancel, children }: ModalProps) => {
  return (
    <div
      className='fixed inset-0 bg-black/50 flex justify-center items-center z-100'
      onClick={onCancel}
    >
      <div
        className='bg-white shadow-xl w-[335px] flex flex-col rounded-[12px] overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full h-[48px] flex items-center justify-center relative'>
          <div className='text-sm'>{title}</div>
          <Button
            onClick={onCancel}
            className='absolute right-3 top-1/2 -translate-y-1/2'
            icon={<Delete height={24} width={24} fill='#090e1d' />}
          ></Button>
        </div>
        <div className='flex flex-col pr-4 pl-4 pb-4'>{children}</div>
        <Button
          onClick={onConfirm}
          className='bg-primary text-white w-full h-[48px] cursor-pointer font-semibold text-sm'
        >
          추가하기
        </Button>
      </div>
    </div>
  );
};

export default Modal;
