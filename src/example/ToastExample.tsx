import Toast from '@/components/common/Toast';
import { useCallback, useState } from 'react';

const Example = () => {
  const [toast, setToast] = useState({ show: false, type: 'error', message: '' });

  const showToast = useCallback((type: any, message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev: any) => ({ ...prev, show: false }));
    }, 2000);
  }, []);

  return (
    <>
      <button
        className='bg-green-100 px-4 py-2'
        onClick={() => showToast('positive', '성공했습니다!')}
      >
        성공
      </button>
      <button className='bg-red-100 px-4 py-2' onClick={() => showToast('error', '실패했습니다.')}>
        실패
      </button>
      <div className='p-4'>
        <Toast show={toast.show} message={toast.message} type={toast.type} />
      </div>
    </>
  );
};

export default Example;
