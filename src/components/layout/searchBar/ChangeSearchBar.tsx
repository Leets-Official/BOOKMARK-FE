import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import SearchBar from './SearchBar';
import Button from '@/components/common/Button';
import { LeftIcon } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { scrollBarWidthAtom } from '@/atoms';
import HomeFooter from '../footer/HomeFooter';

// props로 검색창의 top마진 값 전달 받음
interface ChangeSearchBarProps {
  barMarginTop: number;
  isBackButton?: boolean;
}

const ChangeSearchBar = ({ barMarginTop, isBackButton = false }: ChangeSearchBarProps) => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [isFixedBar, setISFixedBar] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const scrollBarWidth = useAtomValue(scrollBarWidthAtom);
  const navigate = useNavigate();
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [barMarginTop]);

  return (
    <>
      {/* 원래 위치의 검색바, props로 style을 전달해서 높이 조절 가능 */}
      <div ref={searchBarRef}>
        <SearchBar isBlur={isBlur} style={{ marginTop: `${barMarginTop}px` }} />
      </div>

      {/* 스크롤 후 고정되는 검색바 */}
      <AnimatePresence mode='wait'>
        {isFixedBar && (
          <>
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={clsx(
                'fixed top-0 z-10 max-w-[1440px] w-full ml-5',
                scrollBarWidth > 0
                  ? `left-[calc(50%-${scrollBarWidth}px)]`
                  : 'left-1/2 transform -translate-x-1/2',
                isBackButton ? 'py-4 px-2' : 'p-4',
              )}
            >
              <div className='flex flex-row items-center w-full'>
                {isBackButton && (
                  <Button
                    icon={<LeftIcon width={24} height={24} stroke='black' strokeWidth={2} />}
                    onClick={() => navigate('/')}
                    className='cursor-pointer mr-2 p-2 rounded-full border-[rgba(234,237,245,1)] shadow-[0_2px_7px_rgba(28,37,53,0.1)] bg-[#FCFCFCCC]/80'
                  />
                )}
                <div className='flex-1 min-w-0'>
                  <SearchBar isFixed={true} type='isHome' />
                </div>
              </div>
            </motion.div>
          </>
        )}
        <HomeFooter isFixedBar={isFixedBar} />
      </AnimatePresence>
    </>
  );
};

export default ChangeSearchBar;
