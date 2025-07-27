import React from 'react';
import { useToast } from '@/context/ToastContext';
import ToastPortal from '@/utils/ToastPortal';

function GlobalToast() {
  const { toast } = useToast();

  return <ToastPortal show={toast.show} message={toast.message} type={toast.type} />;
}

export default GlobalToast;
