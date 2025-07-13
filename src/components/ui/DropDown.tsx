import React from 'react';
import { BackArrow } from '@/assets';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { tv } from 'tailwind-variants';

interface DropDownProps {
  icon?: React.ReactNode;
  title: string;
  subTitle: string;
  options: {
    id: number;
    name: string;
  }[];
  selectedOption: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedOption: (option: string) => void;
}

const titleStyle = tv({
  base: 'font-medium text-darkGray',
  variants: {
    large: { true: 'text-xs', false: 'text-[15px]' },
  },
});

const DropDown = ({
  icon,
  title,
  subTitle,
  options,
  selectedOption,
  setSelectedOption,
}: DropDownProps) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  // 드롭다운 위치 업데이트(계속 부모 위치 바로 밑으로)
  useEffect(() => {
    function updatePosition() {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownStyle({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }

    if (isOpenOptions) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true); // true: 버블링 단계에서 모든 스크롤 감지
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpenOptions]);

  return (
    <>
      <motion.div
        ref={buttonRef}
        className={`w-full bg-white rounded-[8px] flex flex-row gap-2 items-center border border-lightBlueGray cursor-pointer relative p-2 justify-between`}
        animate={{
          backgroundColor: isOpenOptions ? '#F2F3F7' : '#FFFFFF',
        }}
        transition={{ duration: 0.2 }} // 0.2초 동안 부드럽게
        onClick={() => setIsOpenOptions((prev) => !prev)}
      >
        <div className='flex flex-row gap-2 items-center'>
          {!isOpenOptions && icon ? icon : null}
          <p className={titleStyle({ large: selectedOption.length > 8 })}>
            {selectedOption === '' ? title : selectedOption}
          </p>
        </div>
        <motion.div
          animate={{
            rotate: isOpenOptions ? 90 : -90,
          }}
          transition={{ duration: 0.2 }}
        >
          <BackArrow width={24} height={24} />
        </motion.div>
      </motion.div>
      {isOpenOptions &&
        // 드롭다운 모달 포탈
        createPortal(
          <motion.div
            className='bg-white rounded-[8px] flex flex-col gap-2 border border-lightBlueGray z-[9999] shadow-lg max-h-60 overflow-y-auto p-4'
            style={{
              position: 'absolute',
              top: dropdownStyle.top + 5,
              left: dropdownStyle.left,
              width: dropdownStyle.width,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className='text-xs font-medium text-grayText mb-3'>{subTitle}</p>
            <div className='flex flex-col gap-6 text-[15px] font-medium'>
              {options.map((option) => (
                <p
                  key={option.id}
                  className='cursor-pointer'
                  onClick={() => {
                    setSelectedOption(option.name);
                    setIsOpenOptions(false);
                  }}
                >
                  {option.name}
                </p>
              ))}
            </div>
          </motion.div>,
          document.body,
        )}
    </>
  );
};

export default DropDown;
