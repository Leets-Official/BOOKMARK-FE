import React, { useEffect, type FC } from 'react';
import { useRef } from 'react';
import DropDownItem from './Item';
import DropDownMenu from './Menu';
import DropDownTrigger from './Trigger';
import clsx from 'clsx';

interface DropDownProps {
  children: React.ReactNode;
  /** 드롭다운 메뉴 닫기 함수 */
  handleClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  isOpen?: boolean;
  className?: string;
}

interface DropDownStatic extends FC<DropDownProps> {
  Trigger: typeof DropDownTrigger;
  Menu: typeof DropDownMenu;
  Item: typeof DropDownItem;
}

const DropDown = (({
  children,
  handleClose,
  menuRef,
  isOpen = false,
  className,
}: DropDownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdownEl = dropdownRef.current;
      const menuEl = menuRef.current; // props로 받은 menuRef 사용
      if (
        dropdownEl &&
        !dropdownEl.contains(e.target as Node) &&
        menuEl &&
        !menuEl.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose, menuRef]);

  return (
    <div ref={dropdownRef} className={clsx('relative', className)}>
      {children}
    </div>
  );
}) as DropDownStatic;

DropDown.Item = DropDownItem;
DropDown.Menu = DropDownMenu;
DropDown.Trigger = DropDownTrigger;

export default DropDown;
