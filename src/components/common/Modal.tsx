import { DeleteIcon } from '@/assets';
import Button from './Button';
import React, { useEffect } from 'react';
import { tv } from 'tailwind-variants';
import clsx from 'clsx';

interface ModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  confirmLabel: string;
}

const ButtonContainer = tv({
  base: 'w-full h-[53px] font-semibold text-sm',
  variants: {
    disabled: {
      true: 'bg-lightBlueGray text-veryLightGray',
      false: 'bg-primary text-white cursor-pointer',
    },
  },
});

const Modal = ({
  title,
  onConfirm,
  onCancel,
  children,
  disabled = false,
  className,
  confirmLabel,
}: ModalProps) => {
  // 모달 열렸을 때 스크롤 작동 멈추기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [onConfirm, onCancel]);

  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black/50 flex justify-center items-center z-100 pb-[30vh]',
        className,
      )}
      onClick={onCancel}
    >
      <div
        className='bg-white shadow-xl w-[335px] flex flex-col rounded-[12px] overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full h-[53px] flex items-center justify-center relative'>
          <div className='text-base font-semibold'>{title}</div>
          <Button
            onClick={onCancel}
            className='absolute right-3 top-1/2 -translate-y-1/2'
            icon={<DeleteIcon height={14} width={14} fill='#090e1d' />}
          ></Button>
        </div>
        {/* 자식 컴포넌트 넣는 곳 */}
        <div className='flex flex-col px-4 pt-4 pb-8'>{children}</div>
        <Button onClick={onConfirm} className={ButtonContainer({ disabled })} disabled={disabled}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
};

export default Modal;
