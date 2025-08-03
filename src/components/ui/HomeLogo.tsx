import { getUserInfo } from '@/api/users/user';
import { SymbolIcon } from '@/assets';
import { useQuery } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';

const HomLogo = () => {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await getUserInfo();
      if (res.error) {
        throw new Error(res.message);
      }
      return res.data;
    },
  });

  return (
    <div className='flex absolute top-30 left-1/2 -translate-x-1/2'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <SymbolIcon className={clsx(isMobile ? 'w-[52px] h-[56px]' : 'w-[76px] h-[84px]')} />
        <p className={clsx('text-[#1A2033] font-semibold', isMobile ? 'text-base' : 'text-2xl')}>
          {userInfo?.nickname ? `${userInfo.nickname}의 인사이트` : null}
        </p>
      </div>
    </div>
  );
};

export default HomLogo;
