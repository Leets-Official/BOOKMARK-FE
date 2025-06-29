import Toast, { type ToastProps } from '@/components/common/Toast';
import { useCallback, useState } from 'react';

const ToastExample = () => {
  const [toast, setToast] = useState<ToastProps>({ show: false, type: 'error', message: '' });

  const showToast = useCallback((type: 'positive' | 'error', message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev: any) => ({ ...prev, show: false }));
    }, 2000);
  }, []);

  return (
    <>
      <button className='bg-green-100' onClick={() => showToast('positive', '성공했습니다!')}>
        성공
      </button>
      <button className='bg-red-100' onClick={() => showToast('error', '실패했습니다.')}>
        실패
      </button>
      <div className='p-4'>
        <Toast show={toast.show} message={toast.message} type={toast.type} />
      </div>
    </>
  );
};

export default ToastExample;
