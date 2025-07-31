// 모달이 뜨면 스크롤 제한
// 스크롤이 제한될 때 화면 너비가 스크롤바 만큼 커지는 것을 방지
import { useLayoutEffect } from 'react';
import { useSetAtom } from 'jotai';
import { scrollBarWidthAtom } from '@/atoms';

export const useScrollLock = (locked: boolean) => {
  const setScrollBarWidth = useSetAtom(scrollBarWidthAtom);

  useLayoutEffect(() => {
    if (!locked) {
      setScrollBarWidth(0);
      return;
    }

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth; // 스크롤바 너비 계산

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`; // 스크롤바가 사라져도 스크롤바의 너비를 유지

    setScrollBarWidth(scrollBarWidth);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
      setScrollBarWidth(0);
    };
  }, [locked, setScrollBarWidth]);
};
