//모달이 뜰 때 스크롤 바가 사라지면서 생기는 순간적인 화면 변화 방지
import { useLayoutEffect } from 'react';

export const useScrollLock = (locked: boolean) => {
  useLayoutEffect(() => {
    if (!locked) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    };
  }, [locked]);
};
