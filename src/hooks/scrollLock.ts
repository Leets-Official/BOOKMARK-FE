import { useLayoutEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { scrollBarWidthAtom } from '@/atoms';

export const useScrollLock = (locked: boolean) => {
  const setScrollBarWidth = useSetAtom(scrollBarWidthAtom);
  const scrollBarWidthRef = useRef(0);
  const isLockedRef = useRef(false);

  useLayoutEffect(() => {
    if (!locked) {
      // locked가 false일 때만 스크롤 락 해제
      if (isLockedRef.current) {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '';
        setScrollBarWidth(0);
        scrollBarWidthRef.current = 0;
        isLockedRef.current = false;
      }
      return;
    }

    // 이미 스크롤이 잠겨있다면 스크롤바 너비만 다시 적용
    if (isLockedRef.current && scrollBarWidthRef.current > 0) {
      document.body.style.paddingRight = `${scrollBarWidthRef.current}px`;
      setScrollBarWidth(scrollBarWidthRef.current);
      return;
    }

    // 처음 스크롤 락 적용
    if (!isLockedRef.current) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      scrollBarWidthRef.current = scrollBarWidth;
      setScrollBarWidth(scrollBarWidth);
      isLockedRef.current = true;
    }

    return () => {
      // cleanup은 컴포넌트가 완전히 언마운트될 때만 실행되도록
      // locked 상태를 확인하지 않음
    };
  }, [locked, setScrollBarWidth]);

  // 컴포넌트 언마운트 시에만 정리
  useLayoutEffect(() => {
    return () => {
      if (isLockedRef.current) {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '';
        setScrollBarWidth(0);
        scrollBarWidthRef.current = 0;
        isLockedRef.current = false;
      }
    };
  }, [setScrollBarWidth]);
};
