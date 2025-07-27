import React from 'react';

interface DropDownItemProps {
  /** 드롭다운 메뉴 안 각 요소의 내용입니다.  */
  children: React.ReactNode;
  /** 드롭다운 메뉴 안 각 요소의 클릭 함수입니다. */
  onClick?: () => void;
}

const DropDownItem = ({ children, onClick }: DropDownItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div
      className='cursor-pointer py-3 px-1 rounded bg-white hover:bg-gray-100'
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default DropDownItem;
