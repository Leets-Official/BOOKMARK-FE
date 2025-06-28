interface ModalProps {
  text: string;
  subText: string;
  cancelButtonText: string;
  confirmButtonText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

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
      className='fixed inset-0 backdrop-blur-sm flex justify-center items-center z-100'
      onClick={onCancel}
    >
      <div
        className='bg-white shadow-xl w-[326px] h-[151px] flex flex-col gap-[24px] pl-[16px] pt-[24px] pb-[16px] pr-[16px] border-2 border-[#FFFFFF] rounded-[4px]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-2xl flex flex-col gap-[8px]'>
          <div className='text-[14px]'>{text}</div>
          <div className='text-[12px] text-[#909090]'>{subText}</div>
        </div>
        <div className='text-sm flex justify-center items-center gap-[12px]'>
          <div
            className='text-[14px] bg-white flex justify-center items-center w-[141px] h-[38px] rounded-[2px] border-1 border-[#F5F5F5] cursor-pointer'
            onClick={onCancel}
          >
            {cancelButtonText}
          </div>
          <div
            className='text-[14px] bg-[#00A1FF] flex justify-center items-center w-[141px] h-[38px] rounded-[2px] cursor-pointer text-white'
            onClick={onConfirm}
          >
            {confirmButtonText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
