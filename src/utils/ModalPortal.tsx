import { createPortal } from 'react-dom';
import Modal from '@/components/common/Modal';
import type React from 'react';

interface ModalPortalProps {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  confirmLabel: string;
}

const ModalPortal = ({
  isOpen,
  title,
  onCancel,
  onConfirm,
  disabled,
  children,
  confirmLabel,
}: ModalPortalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <Modal
      title={title}
      onCancel={onCancel}
      onConfirm={onConfirm}
      disabled={disabled}
      className='pt-[30vh]'
      confirmLabel={confirmLabel}
    >
      {children}
    </Modal>,
    document.body,
  );
};

export default ModalPortal;
