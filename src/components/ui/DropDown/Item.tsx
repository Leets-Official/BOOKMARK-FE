import React from 'react';

interface DropDownItemProps {
  /** 드롭다운 메뉴 안 각 요소의 내용입니다.  */
  children: React.ReactNode;
  /** 드롭다운 메뉴 안 각 요소의 클릭 함수입니다. */
  onClick?: () => void;
}

const DropDownItem = ({ children, onClick }: DropDownItemProps) => (
  <div className={`cursor-pointer`} onClick={onClick}>
    {children}
  </div>
);

export default DropDownItem;
