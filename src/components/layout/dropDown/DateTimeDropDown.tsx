import React, { useRef } from 'react';
import DropDown from '@/components/ui/DropDown';
import { motion } from 'framer-motion';
import { BackArrowIcon } from '@/assets';

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
    <DropDown handleClose={() => setIsOpen(false)} menuRef={menuRef} isOpen={isOpen}>
      <DropDown.Trigger onClick={() => setIsOpen(!isOpen)} ref={parentRef}>
        <div className='w-[150px] bg-white rounded-[8px] flex flex-row gap-2 items-center border border-lightBlueGray cursor-pointer relative p-2 justify-between'>
          <div className='flex flex-row gap-2 items-center'>
            {icon}
            <p>{selectedOption || title}</p>
          </div>
          <motion.div
            animate={{
              rotate: isOpen ? 90 : -90,
            }}
            transition={{ duration: 0.2 }}
          >
            <BackArrowIcon width={24} height={24} />
          </motion.div>
        </div>
      </DropDown.Trigger>
      <DropDown.Menu
        isOpen={isOpen}
        parentRef={parentRef}
        ref={menuRef}
        className='absolute top-full left-0 mt-2 bg-white rounded-[8px] flex flex-col gap-5 border border-lightBlueGray z-[9999] shadow-lg max-h-60 overflow-y-auto p-4 w-[150px]'
      >
        <p className='text-sm text-lightBlueGray font-medium'>{subTitle}</p>
        <div className='flex flex-col gap-5 text-gray'>
          {options.map((option) => (
            <DropDown.Item key={option.id} onClick={() => onItemClick(option.name)}>
              {option.name}
            </DropDown.Item>
          ))}
        </div>
      </DropDown.Menu>
    </DropDown>
  );
};

export default DateTimeDropDown;
