import { BackArrowIcon } from '@/assets';
import { Button } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';

const CommonHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // 모바일에서는 안전한 네비게이션을 위해 홈으로 이동
    if (isMobile) {
      navigate('/');
    } else {
      // PC에서는 기존 방식 유지
      navigate(-1);
    }
  };

  return (
    <div
      className={clsx(
        'flex flex-row items-center w-full justify-center relative',
        isMobile ? 'mt-5' : 'mt-10',
      )}
    >
      <Button
        icon={<BackArrowIcon width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} />}
        onClick={handleBackClick}
        className='absolute left-4 rounded-[100px] bg-[#F2F3F799]/60 border border-[#EAEDF5] p-2.5 hover:brightness-90 transition'
      />
      <p className='text-base font-semibold'>{title}</p>
    </div>
  );
};

export default CommonHeader;
