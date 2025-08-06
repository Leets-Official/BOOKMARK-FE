import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import { Button } from '@/components/common';

const Inquiry = () => {
  const navigate = useNavigate();

  // 모바일은 접근 불가
  useEffect(() => {
    if (isMobile) {
      navigate('/my-page', { replace: true });
    }
  }, [navigate]);

  const handleCopyInquiry = () => {
    const success = copy('insightboxxx@gmail.com');
    if (success) {
      toast.dismiss();
      toast.success('이메일이 복사되었습니다');
    } else {
      toast.dismiss();
      toast.error('이메일 복사에 실패했습니다');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-3 gap-5 mt-10'>
      <p className='text-2xl font-semibold text-stone self-start px-2 mb-5'>문의하기</p>
      <div className='flex flex-row self-start gap-3 px-3 items-center'>
        <p className='text-15 text-gray-500'>insightboxxx@gmail.com</p>
        <Button
          onClick={handleCopyInquiry}
          className='text-15 font-medium cursor-pointer border border-gray rounded-[10px] px-3 py-2'
        >
          복사
        </Button>
      </div>
    </div>
  );
};

export default Inquiry;
