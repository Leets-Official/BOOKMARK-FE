import React, { useEffect, type FC } from 'react';
import { useRef } from 'react';
import DropDownItem from './Item';
import DropDownMenu from './Menu';
import DropDownTrigger from './Trigger';

interface DropDownProps {
  children: React.ReactNode;
  /** 드롭다운 메뉴 닫기 함수 */
  handleClose: () => void;
}

interface DropDownStatic extends FC<DropDownProps> {
  Trigger: typeof DropDownTrigger;
  Menu: typeof DropDownMenu;
  Item: typeof DropDownItem;
}

const DropDown = (({ children, handleClose }: DropDownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div ref={dropdownRef} className='relative'>
      {children}
    </div>
  );
}) as DropDownStatic;

DropDown.Item = DropDownItem;
DropDown.Menu = DropDownMenu;
DropDown.Trigger = DropDownTrigger;

export default DropDown;
