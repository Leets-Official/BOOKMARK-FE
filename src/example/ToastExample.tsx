import Toast from '@/components/common/Toast';
import { useState } from 'react';

// ToastItem 타입 정의
interface ToastItem {
  id: string;
  type: 'positive' | 'error';
  message: string;
}

const ToastExample = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (type: 'positive' | 'error', message: string) => {
    // 고유한 ID를 생성하여 새로운 Toast 객체를 만듬
    const newToast = {
      id: Date.now().toString(),
      type,
      message,
    };
    setToasts((prev) => [...prev, newToast]); // 현재 toasts 배열에 새로운 Toast를 추가

    // 2초 뒤에 해당 Toast를 배열에서 제거하여 화면에서 사라지게 함
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id)); // ID가 일치하지 않는 항목만 남김
    }, 2000);
  };

  return (
    <>
      <button className='bg-green-100 p-4' onClick={() => showToast('positive', '성공했습니다!')}>
        성공
      </button>
      <button className='bg-red-100 p-4' onClick={() => showToast('error', '실패했습니다.')}>
        실패
      </button>

      {/* Toast 리스트 출력 */}
      <div className='p-4'>
        {toasts.map((toast) => (
          <Toast key={toast.id} show={true} message={toast.message} type={toast.type} />
        ))}
      </div>
    </>
  );
};

export default ToastExample;
