import DropDown from '@/components/ui/DropDown';
import { useState } from 'react';

const DropDownExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-row gap-4 w-full p-4 items-center justify-center'>
      <DropDown handleClose={() => setIsOpen(false)}>
        <DropDown.Trigger onClick={() => setIsOpen((prev) => !prev)}>
          <span>Open</span>
        </DropDown.Trigger>
        <DropDown.Menu isOpen={isOpen} position='top-5 right-0'>
          <DropDown.Item>
            <span>Item 1</span>
          </DropDown.Item>
          <DropDown.Item>
            <span>Item 1</span>
          </DropDown.Item>
          <DropDown.Item>
            <span>Item 1</span>
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export default DropDownExample;
