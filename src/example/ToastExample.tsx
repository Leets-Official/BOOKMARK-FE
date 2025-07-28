import toast from 'react-hot-toast';

function ToastExample() {
  const showSuccessToast = () => {
    toast.success('성공적으로 처리되었습니다!');
  };

  const showErrorToast = () => {
    toast.error('오류가 발생했습니다. 다시 시도해주세요.');
  };

  const showCustomSuccessToast = () => {
    toast.success('데이터가 성공적으로 저장되었습니다.', {
      duration: 4000,
    });
  };

  const showCustomErrorToast = () => {
    toast.error('네트워크 연결에 실패했습니다.', {
      duration: 5000,
    });
  };

  return (
    <div className='p-6 space-y-4'>
      <h2 className='text-xl font-bold'>토스트 예제</h2>

      <div className='space-y-2'>
        <button
          onClick={showSuccessToast}
          className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
        >
          성공 토스트 보기
        </button>

        <button
          onClick={showErrorToast}
          className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors ml-2'
        >
          오류 토스트 보기
        </button>
      </div>

      <div className='space-y-2'>
        <button
          onClick={showCustomSuccessToast}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
        >
          커스텀 성공 토스트 (4초)
        </button>

        <button
          onClick={showCustomErrorToast}
          className='px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors ml-2'
        >
          커스텀 오류 토스트 (5초)
        </button>
      </div>
    </div>
  );
}

export default ToastExample;
