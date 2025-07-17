import React from 'react';

interface DropDownItemProps {
  /** 드롭다운 메뉴 안 각 요소의 내용입니다.  */
  children: React.ReactNode;
  /** 드롭다운 메뉴 안 각 요소의 클릭 함수입니다. */
  onClick?: () => void;
  className?: string;
}

const DropDownItem = ({ children, onClick, className }: DropDownItemProps) => (
  <li className={`cursor-pointer ${className}`} onClick={onClick}>
    {children}
  </li>
);

export default DropDownItem;
