import { WarningIcon } from '@/assets';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '@/hooks/ScrollLock';

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
  warningText: string;
  subText?: string;
}

const DeleteModal = ({ isOpen, onCancel, onDelete, warningText, subText }: DeleteModalProps) => {
  useScrollLock(isOpen);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className='fixed inset-0 z-200 flex items-center justify-center bg-black/50'
      onClick={() => onCancel()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-xl w-[335px] min-h-[208px] shadow-lg'
      >
        <div className='flex flex-col items-center text-center mt-4'>
          <WarningIcon />
          <div className='flex flex-col items-center mb-2 w-full px-8'>
            <p className='text-base font-semibold mt-4 break-keep whitespace-pre-wrap'>
              {warningText}
            </p>
            {subText && (
              <p className='text-sm text-gray-500 mt-2 break-keep whitespace-pre-wrap'>{subText}</p>
            )}
          </div>
        </div>
        <hr className='border-1 border-lightGrayBlue mt-5' />
        <div className='flex gap-3 justify-end text-center p-4'>
          <button
            onClick={onCancel}
            className='px-3 py-2 border border-[#BCC0CC] bg-white hover:brightness-90 rounded-[10px] transition text-15'
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className='px-3 bg-[#FF2C3D] hover:brightness-90 text-white rounded-[10px] transition text-15'
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default DeleteModal;
