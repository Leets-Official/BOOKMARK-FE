import { Delete } from '@/assets';
import Button from './Button';
import type React from 'react';
import { tv } from 'tailwind-variants';

interface ModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const ButtonContainer = tv({
  base: 'w-full h-[48px] font-semibold text-sm',
  variants: {
    disabled: {
      true: 'bg-lightBlueGray text-veryLightGray',
      false: 'bg-primary text-white cursor-pointer',
    },
  },
});

const Modal = ({ title, onConfirm, onCancel, children, disabled = false }: ModalProps) => {
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
          <div className='text-sm font-medium'>{title}</div>
          <Button
            onClick={onCancel}
            className='absolute right-3 top-1/2 -translate-y-1/2'
            icon={<Delete height={24} width={24} fill='#090e1d' />}
          ></Button>
        </div>
        {/* 자식 컴포넌트 넣는 곳 */}
        <div className='flex flex-col pr-4 pl-4 pb-4'>{children}</div>
        <Button onClick={onConfirm} className={ButtonContainer({ disabled })} disabled={disabled}>
          추가하기
        </Button>
      </div>
    </div>
  );
};

export default Modal;
