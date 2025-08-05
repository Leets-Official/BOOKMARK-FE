import ChangeSearchBar from '@/components/layout/searchBar/ChangeSearchBar';
import CardList from '@/components/ui/cardList/CardList';
import MobileCardList from '@/components/ui/cardList/MobileCardList';
import { isMobile } from 'react-device-detect';
import { Outlet } from 'react-router-dom';
import SaveCardList from '@/components/ui/cardList/SaveCardList';
import HomLogo from '@/components/ui/HomeLogo';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/category/category';
import Loading from '@/components/ui/loading/Loading';
import CardListHeader from '@/components/layout/header/CardListHeader';
import ProfileHeader from '@/components/layout/header/ProfileHeader';
import HomeFooter from '@/components/layout/footer/HomeFooter';
import { useSetAtom } from 'jotai';
import { searchContentsAtom } from '@/atoms';
import { useEffect } from 'react';

const Home = () => {
  const setSearchContents = useSetAtom(searchContentsAtom);

  // 홈으로 돌아갈 땐 무조건 검색어 초기화
  useEffect(() => {
    setSearchContents('');
  }, [setSearchContents]);

  // 카테고리 조회
  const { data: categories, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await getCategories();
      if (res.error) {
        throw new Error(res.message);
      }
      return res.data;
    },
  });

  return (
    <div className='max-w-[1200px] mx-auto relative min-h-screen bg-white'>
      <ProfileHeader />
      <HomLogo />
      <ChangeSearchBar barMarginTop={isMobile ? 225 : 285} />
      {isPending ? (
        <div className={isMobile ? 'mt-20' : 'mt50'}>
          <CardListHeader currentNum={'0'} title='카테고리' showCategory={true} />
          <Loading className='bg-white w-full h-[252px] rounded-xl  p-3 py-6 flex justify-center items-center' />
        </div>
      ) : (
        <>
          {isMobile ? (
            <MobileCardList categories={categories || []} />
          ) : (
            <CardList categories={categories || []} />
          )}
        </>
      )}
      <SaveCardList />
      <HomeFooter />
      <Outlet />
    </div>
  );
};

export default Home;
