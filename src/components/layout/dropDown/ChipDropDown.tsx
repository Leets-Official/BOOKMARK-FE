import Chip from '@/components/common/Chip';
import DropDown from '@/components/ui/DropDown';
import type { ChipProps } from '@/types';
import { useRef, useState } from 'react';

interface ChipDropDownProps {
  title: string;
  options: ChipProps[];
}

const ChipDropDown = ({ title, options }: ChipDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <DropDown handleClose={() => setIsOpen(false)} menuRef={menuRef} isOpen={isOpen}>
      <DropDown.Trigger onClick={() => setIsOpen((prev) => !prev)} ref={parentRef}>
        <Chip
          disabled={true}
          content={title}
          isSelected={isOpen}
          className='border-lightGrayBlue bg-white cursor-pointer'
          dropdownEnabled={true}
        />
      </DropDown.Trigger>
      <DropDown.Menu
        isOpen={isOpen}
        parentRef={parentRef}
        alignLeft={true}
        className='fixed left-0 top-0 px-2 w-full'
        ref={menuRef}
      >
        <div className='bg-white rounded-[8px] flex flex-col gap-5 border border-lightBlueGray z-[9999] shadow-lg h-[144px] overflow-y-auto p-4 mt-1'>
          <p className='text-15 text-stone font-semibold'>{title}</p>
          <div className='flex flex-row gap-2 flex-wrap'>
            {options.map((option) => (
              <DropDown.Item key={option.id} onClick={() => console.log('clicked')}>
                <Chip
                  key={option.id}
                  content={option.content}
                  isSelected={false}
                  className='border-lightGrayBlue bg-white'
                  dropdownEnabled={false}
                />
              </DropDown.Item>
            ))}
          </div>
        </div>
      </DropDown.Menu>
    </DropDown>
  );
};

export default ChipDropDown;
