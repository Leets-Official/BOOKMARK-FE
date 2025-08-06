import { motion } from 'framer-motion';
import Button from './Button';
import { BackArrowIcon, DeleteIcon, SettingIcon, StarIcon } from '@/assets';
import clsx from 'clsx';
import type React from 'react';

interface ChipProps {
  content: React.ReactNode;
  className?: string;
  isSelected: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onSetting?: () => void;
  disabled?: boolean;
  dropdownEnabled?: boolean;
  selectedClassName?: string;
  deleteIconColor?: string;
  suggestion?: boolean;
  color?: string;
}

const Chip = ({
  content,
  isSelected,
  onClick,
  onDelete,
  onSetting,
  disabled = false,
  dropdownEnabled = false,
  className,
  selectedClassName,
  deleteIconColor = '#000000',
  suggestion,
  color,
}: ChipProps) => {
  const hoverAnimation = disabled ? undefined : { scale: 1.05 };
  const tapAnimation = disabled ? undefined : { scale: 0.95 };
  const handleClick = disabled ? undefined : onClick;

  return (
    <motion.div
      className={clsx(
        'rounded-[100px] flex items-center justify-center border text-sm h-8 p-2.5 flex-row gap-1.5',
        !disabled && 'cursor-pointer',
        !isSelected ? className : selectedClassName,
        ' group relative',
      )}
      style={{ backgroundColor: color }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      onClick={handleClick}
    >
      {suggestion && <StarIcon width={20} height={20} />}
      <p className='whitespace-nowrap'>{content}</p>
      {/* 삭제 함수가 있을시 활성화 */}
      {onDelete && (
        <Button
          onClick={() => {
            onDelete?.();
          }}
          icon={<DeleteIcon height={10} width={10} stroke={deleteIconColor} />}
          className='cursor-pointer'
        />
      )}
      {/* 설정 함수가 있을시 활성화 */}
      {onSetting && (
        <Button
          onClick={() => {
            onSetting?.();
          }}
          icon={<SettingIcon height={24} width={24} stroke={isSelected ? '#397FFF' : '#545966'} />}
          className='cursor-pointer'
        />
      )}
      {/* Chip 드롭다운 옵션*/}
      {dropdownEnabled && (
        <motion.div
          animate={{
            rotate: !isSelected ? -90 : 90,
          }}
          transition={{ duration: 0.2 }}
        >
          <BackArrowIcon width={16} height={16} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Chip;
