import Button from '@/components/common/Button';
import Chip from '@/components/common/Chip';
import DropDown from '@/components/ui/DropDown';
import type { ChipProps } from '@/types/components/components';
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

  // Menu(옵션) 클릭 시 선택 여부 변경
  const handleChipClick = (id: number) => {
    const newOptions = options.map((o) => (o.id === id ? { ...o, isSelected: !o.isSelected } : o));
    onChange(newOptions);
  };

  // 초기화 버튼 클릭 시 모든 옵션 선택 해제
  const handleResetClick = () => {
    const newOptions = options.map((o) => ({ ...o, isSelected: false }));
    onChange(newOptions);
  };

  // Menu(옵션) 선택 시 Tigger text와 Chip 색상 변경
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
            'cursor-pointer min-w-0',
            isSelectedOption ? 'border-primary bg-lightPrimary' : 'border-lightGrayBlue bg-white',
          )}
          selectedClassName='border-primary bg-lightPrimary'
          dropdownEnabled={true}
        />
      </DropDown.Trigger>
      <DropDown.Menu
        isOpen={isOpen}
        parentRef={parentRef}
        alignLeft={true}
        onClose={() => setIsOpen(false)}
        className='inset-x-0 top-0 px-3 mx-auto w-full max-w-[700px]'
        ref={menuRef}
      >
        <div className='bg-white rounded-xl shadow-[0px_2px_7px_rgba(2,34,94,0.1)] flex flex-col border border-gray-200 z-[9999] p-2 mt-1'>
          <div className='flex flex-col gap-3 overflow-y-auto px-2'>
            <p className='text-15 text-stone font-semibold mt-3'>{title}</p>
            <div className='flex flex-row gap-3 flex-wrap pb-2'>
              {options.map((option) => (
                <DropDown.Item key={option.id} onClick={() => console.log('clicked')}>
                  <Chip
                    key={option.id}
                    content={option.content}
                    isSelected={option.isSelected}
                    className='border-lightGrayBlue bg-white'
                    selectedClassName='border-primary bg-lightPrimary'
                    dropdownEnabled={false}
                    onClick={() => handleChipClick(option.id)}
                  />
                </DropDown.Item>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <hr className='border-lightGrayBlue border-0.5' />
            <div className='mb-3 items-start pl-5 py-1'>
              <Button
                className='border-b-2 border-black pb-0.5 font-medium cursor-pointer text-15'
                onClick={handleResetClick}
              >
                초기화
              </Button>
            </div>
          </div>
        </div>
      </DropDown.Menu>
    </DropDown>
  );
};

export default ChipDropDown;
