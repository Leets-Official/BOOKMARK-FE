import { SymbolIcon } from '@/assets';

const HomLogo = () => {
  return (
    <div className='flex flex-col items-center justify-center absolute top-40 left-1/2 -translate-x-1/2 w-4/5 max-w-[50rem] max-sm:w-9/10'>
      {/* 로고 */}
      <div className='flex justify-center sm:mb-2'>
        <SymbolIcon />
      </div>

      {/* 서브 텍스트 */}
      <div className='flex justify-center w-full'>
        <p className='text-blue text-lg font-medium max-sm:text-base'>북마크의 인사이트</p>
      </div>
    </div>
  );
};

export default HomLogo;
