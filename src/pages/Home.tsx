import SideBar from '@/components/layout/sidebar/SideBar';
import HomeSearchBar from '@/components/layout/searchBar/HomeSearchBar';
import CardList from '@/components/ui/cardlist/CardList';
import MobileCardList from '@/components/ui/cardlist/MobileCardList';
import { isMobile } from 'react-device-detect';
import MobileHeader from '@/components/layout/header/MobileHeader';
import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomeFooter from '@/components/layout/footer/HomeFooter';
import LatestListHeader from '@/components/layout/header/LatestListHeader';
import clsx from 'clsx';

const Home = () => {
  const cardList = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    title: `제목 ${i + 1}`,
  }));

  const searchBarRef = useRef<HTMLDivElement>(null);
  const [isFixedVisible, setShowFixedVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!searchBarRef.current) return; // 아직 검색창이 렌더링 되지 않았으면 종료

      //검색창 DOM 요소의 위치 정보를 가져옴 (브라우저 뷰포트 기준)
      // -> getBoundingClientRect()는 브라우저에서 뷰포트(화면) 내 위치를 알려주는 메서드
      const barPosition = searchBarRef.current.getBoundingClientRect();
      const isSearchBarVisible = barPosition.bottom > 0; // 검색창의 하단이 화면 안에 보이면 true

      // isSearchBarVisibledl false 즉, 화면에서 검색창이 완전히 사라지면 fixed 검색창 보여줌
      setShowFixedVisible(!isSearchBarVisible);
    };

    window.addEventListener('scroll', handleScroll); // 사용자가 스크롤할 때마다 검색창 위치를 검사
    return () => window.removeEventListener('scroll', handleScroll); // 메모리 누수 방지를 위한 이벤트 제거
  }, []);

  return (
    <div className='relative min-h-screen'>
      {/* 데스크탑일 경우 사이드바 나타남 */}
      {!isMobile ? <SideBar /> : <MobileHeader />}
      {/* 원래 위치의 검색바, props로 className을 전달해서 높이 조절 가능 */}
      <div ref={searchBarRef}>
        <HomeSearchBar className='mt-[12.5rem]' />
      </div>
      {/* 스크롤 후 고정되는 검색바 */}
      <AnimatePresence mode='wait'>
        {isFixedVisible && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='fixed w-full top-0 z-10 p-4'
          >
            <HomeSearchBar
              isFixed={true}
              className={clsx(
                'mx-auto rounded-[100px] bg-white',
                isMobile ? '-translate-x-5' : '-translate-x/2',
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 모바일/데스크탑 구분 */}
      {isMobile ? (
        <>
          <MobileCardList cardList={cardList} />
          <HomeFooter />
        </>
      ) : (
        <CardList cardList={cardList} />
      )}
      <LatestListHeader />
      <Outlet />
    </div>
  );
};

export default Home;
