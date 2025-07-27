import { createPortal } from 'react-dom';
import Toast from '@/components/common/Toast';
import React from 'react';

export interface ToastPortalProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error';
}

const ToastPortal: React.FC<ToastPortalProps> = ({ show, message, type = 'success' }) => {
  if (!show) return null;
  return createPortal(<Toast show={show} message={message} type={type} />, document.body);
};

export default ToastPortal;
