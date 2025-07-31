import React, { useRef } from 'react';
import DropDown from '@/components/ui/DropDown';
import { BackArrowIcon } from '@/assets';
import clsx from 'clsx';

interface DateTimeDropDownProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  icon: React.ReactNode;
  options: { id: number; name: string }[];
  title: string;
  subTitle: string;
  selectedOption: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedOption: (option: string) => void;
}

const DateTimeDropDown = ({
  isOpen,
  setIsOpen,
  icon,
  options,
  title,
  subTitle,
  selectedOption,
  setSelectedOption,
}: DateTimeDropDownProps) => {
  const onItemClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const parentRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <DropDown handleClose={() => setIsOpen(false)} menuRef={menuRef} className='flex-1'>
      <DropDown.Trigger onClick={() => setIsOpen(!isOpen)} ref={parentRef} className='w-full'>
        <div
          className={clsx(
            'w-full h-[40px] rounded-[8px] flex flex-row items-center border border-gray cursor-pointer relative p-2 justify-between',
            isOpen ? 'bg-snowGray' : 'bg-white',
          )}
        >
          <div className='flex flex-row gap-2 items-center text-stone text-15 font-medium'>
            {!isOpen && icon}
            <p>{selectedOption || title}</p>
          </div>
          <div
            className={clsx(
              'transform transition-transform duration-300',
              isOpen ? 'rotate-90' : '-rotate-90',
            )}
          >
            <BackArrowIcon width={18} height={18} />
          </div>
        </div>
      </DropDown.Trigger>
      <DropDown.Menu
        isOpen={isOpen}
        parentRef={parentRef}
        ref={menuRef}
        className='absolute top-full left-0 mt-2 bg-white rounded-[8px] flex flex-col gap-2 border border-areaBorder z-100 shadow-[0_2px_7px_rgba(2,34,94,0.1)] max-h-60 overflow-y-auto thin-scrollbar p-2 font-medium'
      >
        <p className='text-[13px] text-areaBorder p-1'>{subTitle}</p>
        <div className='flex flex-col text-15 text-stone'>
          {options.map((option) => (
            <DropDown.Item
              key={option.id}
              onClick={() => onItemClick(option.name)}
              className='hover:bg-gray-100 py-3 px-1'
            >
              {option.name}
            </DropDown.Item>
          ))}
        </div>
      </DropDown.Menu>
    </DropDown>
  );
};

export default DateTimeDropDown;
