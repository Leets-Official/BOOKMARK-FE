import clsx from 'clsx';
import React from 'react';

interface DropDownItemProps {
  /** 드롭다운 메뉴 안 각 요소의 내용입니다.  */
  children: React.ReactNode;
  /** 드롭다운 메뉴 안 각 요소의 클릭 함수입니다. */
  onClick?: () => void;
  className?: string;
}

const DropDownItem = ({ children, onClick, className }: DropDownItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div className={clsx('cursor-pointer rounded bg-white', className)} onClick={handleClick}>
      {children}
    </div>
  );
};

export default DropDownItem;
