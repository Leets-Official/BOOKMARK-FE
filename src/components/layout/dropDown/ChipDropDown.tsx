import Chip from '@/components/common/Chip';
import DropDown from '@/components/ui/DropDown';
import { dummyCategoryList } from '@/contants/DummyData';
import { useRef, useState } from 'react';

const ChipDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const categories = dummyCategoryList;

  return (
    <DropDown handleClose={() => setIsOpen(false)} menuRef={menuRef}>
      <DropDown.Trigger onClick={() => setIsOpen((prev) => !prev)} ref={parentRef}>
        <Chip content='카테고리' isSelected={isOpen} type='category' dropdownEnabled={true} />
      </DropDown.Trigger>
      <DropDown.Menu
        isOpen={isOpen}
        parentRef={parentRef}
        alignLeft={true}
        className='fixed left-0 top-0 px-2 w-full'
        ref={menuRef}
      >
        <div className='bg-white rounded-[8px] flex flex-col gap-5 border border-lightBlueGray z-[9999] shadow-lg h-[144px] overflow-y-auto p-4 mt-1'>
          <p className='text-15 text-stone font-semibold'>카테고리</p>
          <div className='flex flex-row gap-2 flex-wrap'>
            {categories.map((category) => (
              <DropDown.Item key={category.id} onClick={() => console.log('clicked')}>
                <Chip
                  key={category.id}
                  content={category.content}
                  isSelected={false}
                  type='category'
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
