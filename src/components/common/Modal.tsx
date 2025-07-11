import { tv } from 'tailwind-variants';

interface ModalProps {
  text: string;
  subText: string;
  cancelButtonText: string;
  confirmButtonText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const modalButton = tv({
  base: 'text-[14px] flex justify-center items-center w-[141px] h-[38px] rounded-[2px] cursor-pointer',
  variants: {
    variant: {
      cancel: 'bg-white border-1 border-grayBorder',
      confirm: 'bg-blue text-white',
    },
  },
});

const Modal = ({
  text,
  subText,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
}: ModalProps) => {
  return (
    <div
      className='fixed inset-0 bg-black/50 flex justify-center items-center z-100'
      onClick={onCancel}
    >
      <div
        className='bg-white shadow-xl w-[326px] h-[151px] flex flex-col gap-[24px] pl-[16px] pt-[24px] pb-[16px] pr-[16px] border-2 border-white rounded-[4px]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-2xl flex flex-col gap-[8px]'>
          <div className='text-[14px]'>{text}</div>
          <div className='text-[12px] text-grayText'>{subText}</div>
        </div>
        <div className='text-sm flex justify-center items-center gap-[12px]'>
          <div className={modalButton({ variant: 'cancel' })} onClick={onCancel}>
            {cancelButtonText}
          </div>
          <div className={modalButton({ variant: 'confirm' })} onClick={onConfirm}>
            {confirmButtonText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
