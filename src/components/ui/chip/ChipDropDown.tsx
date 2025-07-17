import Chip from '@/components/common/Chip';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ChipDropDownProps {
  title: string;
  subTitle: string;
  options: { id: number; name: string }[];
  selectedOption: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedOption: (option: string) => void;
}

const ChipDropDown = ({
  title,
  subTitle,
  options,
  selectedOption,
  setSelectedOption,
}: ChipDropDownProps) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, []);

  // 드롭다운 위치 업데이트(계속 부모 위치 바로 밑으로)
  useEffect(() => {
    if (isOpenOptions) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true); // true: 버블링 단계에서 모든 스크롤 감지
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpenOptions, updatePosition]);

  const displayText = selectedOption || title;

  return (
    <div ref={buttonRef} className='flex flex-col gap-2 w-full'>
      <Chip
        content={displayText}
        isSelected={false}
        type='category'
        onClick={() => setIsOpenOptions((prev) => !prev)}
      />

      {isOpenOptions &&
        // 드롭다운 모달 포탈
        createPortal(
          <div className='w-screen p-4'>
            <motion.div
              className='bg-white rounded-[8px] flex flex-col gap-2 border border-lightBlueGray z-[9999] shadow-lg overflow-y-auto p-4'
              style={{
                position: 'absolute',
                top: dropdownStyle.top + 5,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className='text-xs font-medium text-grayText mb-3'>{subTitle}</p>
              <div className='flex flex-row gap-2 flex-wrap'>
                {options.map((option) => (
                  <Chip
                    key={option.id}
                    content={option.name}
                    isSelected={false}
                    type='category'
                    onClick={() => {
                      setSelectedOption(option.name);
                      setIsOpenOptions(false);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ChipDropDown;
