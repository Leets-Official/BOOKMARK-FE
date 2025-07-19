import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const HomeFooter = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('save')}
      className={clsx(
        'bg-blue flex fixed right-4 bottom-4 justify-center items-center sm:w-35 w-28 sm:h-17 h-13 text-white shadow-md',
        'rounded-[100px] hover:brightness-75 transition z-20 gap-[10px] sm:text-[18px] text-[15px] border border-[#B2CDFF] cursor-pointer',
      )}
    >
      링크 추가
      <span className='sm:text-[30px] text-[24px]'>+</span>
    </div>
  );
};

export default HomeFooter;
