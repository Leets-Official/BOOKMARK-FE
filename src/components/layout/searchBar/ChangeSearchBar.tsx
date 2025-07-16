// ChangeSearchBar.tsx
import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';
import HomeSearchBar from './HomeSearchBar';

// props로 검색창의 top마진 값 전달 받음
interface ChangeSearchBarProps {
  barMarginTop: number;
}

const ChangeSearchBar = ({ barMarginTop }: ChangeSearchBarProps) => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [isFixedBar, setISFixedBar] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!searchBarRef.current) return; // 아직 검색창이 렌더링 되지 않았으면 종료

      //검색창 DOM 요소의 위치 정보를 가져옴 (브라우저 뷰포트 기준)
      // -> getBoundingClientRect()는 브라우저에서 뷰포트(화면) 내 위치를 알려주는 메서드
      const barPosition = searchBarRef.current.getBoundingClientRect();
      const isPassedMargin = barPosition.top <= -barMarginTop; // 검색창의 상단이 화면 맨 위에 닿으면 true

      setISFixedBar(isPassedMargin); // 화면에 검색창이 닿으면 고정 검색바 보여줌
      setIsBlur(isPassedMargin); // 기존 검색바는 blur처리
    };

    window.addEventListener('scroll', handleScroll); // 사용자가 스크롤할 때마다 검색창 위치를 검사
    return () => window.removeEventListener('scroll', handleScroll); // 메모리 누수 방지를 위한 이벤트 제거
  }, [barMarginTop]);

  return (
    <>
      {/* 원래 위치의 검색바, props로 className을 전달해서 높이 조절 가능 */}
      <div ref={searchBarRef}>
        <HomeSearchBar isBlur={isBlur} className={`mt-[${barMarginTop}px]`} />
      </div>

      {/* 스크롤 후 고정되는 검색바 */}
      <AnimatePresence mode='wait'>
        {isFixedBar && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='fixed w-full top-0 z-10 p-4'
          >
            <HomeSearchBar
              isFixed={true}
              className={clsx(isMobile ? '-translate-x-5' : '-translate-x/2')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChangeSearchBar;
