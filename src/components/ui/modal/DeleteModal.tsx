import { WarningIcon } from '@/assets';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
  warningText: string;
}

const DeleteModal = ({ isOpen, onCancel, onDelete, warningText }: DeleteModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={() => onCancel()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-xl w-[335px] min-h-[208px] shadow-lg'
      >
        <div className='flex flex-col items-center text-center m-4 mx-10'>
          <WarningIcon />
          <p className='text-base font-semibold mt-4 mb-5 break-keep whitespace-pre-wrap'>
            {warningText}
          </p>
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
