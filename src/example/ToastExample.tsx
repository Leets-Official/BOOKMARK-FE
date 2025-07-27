import { useToast } from '@/hooks/useToast';
import ToastPortal from '@/utils/ToastPortal';
import Button from '@/components/common/Button';

function ToastExample() {
  const { toast, showToast, hideToast } = useToast();

  const handleSuccessToast = () => {
    showToast('성공적으로 저장되었습니다!', 'success', 3000);
  };

  const handleErrorToast = () => {
    showToast('오류가 발생했습니다. 다시 시도해주세요.', 'error', 5000);
  };

  const handleCustomDurationToast = () => {
    showToast('커스텀 지속 시간 토스트입니다.', 'success', 10000);
  };

  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-2xl font-bold mb-6'>Toast Portal 예시</h1>

      <div className='space-y-2'>
        <Button onClick={handleSuccessToast}>성공 토스트 표시</Button>

        <Button onClick={handleErrorToast}>에러 토스트 표시</Button>

        <Button onClick={handleCustomDurationToast}>긴 지속 시간 토스트</Button>

        <Button onClick={hideToast}>토스트 숨기기</Button>
      </div>

      <div className='mt-8'>
        <h2 className='text-lg font-semibold mb-2'>현재 토스트 상태</h2>
        <div className='p-4 bg-gray-100 rounded'>
          <p>표시 여부: {toast.show ? '보임' : '숨김'}</p>
          <p>메시지: {toast.message || '없음'}</p>
          <p>타입: {toast.type}</p>
        </div>
      </div>

      {/* Toast Portal이 여기에 렌더링됩니다 */}
      <ToastPortal show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default ToastExample;
