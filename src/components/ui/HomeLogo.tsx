import { getUserInfo } from '@/api/users/user';
import { SymbolIcon } from '@/assets';
import { useQuery } from '@tanstack/react-query';

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
        <SymbolIcon width={76} height={83} />
        <p className='text-[#1A2033] text-2xl font-semibold'>
          {userInfo?.nickname ?? '북마크'}의 인사이트
        </p>
      </div>
    </div>
  );
};

export default HomLogo;
