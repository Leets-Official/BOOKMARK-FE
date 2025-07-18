import Chip from '@/components/common/Chip';
import DropDown from '@/components/ui/DropDown';
import type { ChipProps } from '@/types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface ChipDropDownProps {
  title: string;
  options: ChipProps[];
  // eslint-disable-next-line no-unused-vars
  onChange: (options: ChipProps[]) => void;
}

const ChipDropDown = ({ title, options, onChange }: ChipDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [triggerTitle, setTriggerTitle] = useState<string>(title);
  const [isSelectedOption, setIsSelectedOption] = useState<boolean>(false);

  const handleChipClick = (id: number) => {
    const newOptions = options.map((o) => (o.id === id ? { ...o, isSelected: !o.isSelected } : o));
    onChange(newOptions);
  };

  useEffect(() => {
    const selectedOptions = options.filter((o) => o.isSelected);
    if (!selectedOptions || selectedOptions.length === 0) {
      setTriggerTitle(title);
      setIsSelectedOption(false);
    } else if (selectedOptions.length === 1) {
      setTriggerTitle(`${selectedOptions[0].content}`);
      setIsSelectedOption(true);
    } else {
      setTriggerTitle(`${selectedOptions[0].content} 외 ${selectedOptions.length - 1}개 선택`);
      setIsSelectedOption(true);
    }
  }, [options, title]);

  return (
    <DropDown handleClose={() => setIsOpen(false)} menuRef={menuRef} isOpen={isOpen}>
      <DropDown.Trigger onClick={() => setIsOpen((prev) => !prev)} ref={parentRef}>
        <Chip
          disabled={true}
          content={triggerTitle}
          isSelected={isOpen}
          className={clsx(
            'cursor-pointer',
            isSelectedOption ? 'border-base bg-lightGray' : 'border-lightGrayBlue bg-white',
          )}
          selectedClassName='bg-lightGray'
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
                  isSelected={option.isSelected}
                  className='border-lightGrayBlue bg-white'
                  dropdownEnabled={false}
                  onClick={() => handleChipClick(option.id)}
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
