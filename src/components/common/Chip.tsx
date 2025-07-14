import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import Button from './Button';
import { Delete } from '@/assets';
import clsx from 'clsx';

interface ChipProps {
  id: string;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion';
  onClick: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

// type(카테고리, 태그, 제안 태그), isSelected(선택됨, 선택안됨)에 따라서 chip 색상 변경
const chipStyle = tv({
  base: 'rounded-[100px] flex items-center justify-center border text-xs h-8 p-2 flex-row gap-1',
  variants: {
    isSelected: { true: '', false: '' },
    type: { category: '', tag: '', suggestion: '' },
  },
  compoundVariants: [
    {
      type: 'category',
      isSelected: true,
      class: 'bg-lightGray border-black',
    },
    {
      type: 'category',
      isSelected: false,
      class: 'bg-white border-grayBorder',
    },
    {
      type: 'tag',
      isSelected: true,
      class: 'bg-grayBg border-black text-grayText',
    },
    {
      type: 'tag',
      isSelected: false,
      class: 'bg-grayBg border-grayBorder text-grayText',
    },
    {
      type: 'suggestion',
      isSelected: true,
      class: 'bg-lightPrimary border-primary text-grayText',
    },
    {
      type: 'suggestion',
      isSelected: false,
      class: 'bg-grayBg border-grayBorder text-grayText',
    },
  ],
});

const Chip = ({
  id,
  content,
  isSelected,
  type,
  onClick,
  onDelete,
  disabled = false,
}: ChipProps) => {
  const hoverAnimation = disabled ? undefined : { scale: 1.05 };
  const tapAnimation = disabled ? undefined : { scale: 0.95 };
  const handleClick = disabled ? undefined : onClick;

  return (
    <motion.div
      className={clsx(
        chipStyle({ isSelected, type }),
        disabled ? '' : ' cursor-pointer',
        ' group relative',
      )}
      layoutId={`${id}`}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      onClick={handleClick}
    >
      <p>{type === 'category' ? content : '#' + content}</p>
      {/* 삭제 함수가 있을시 활성화 */}
      {onDelete && (
        <Button
          onClick={() => {
            onDelete?.();
          }}
          icon={<Delete height={16} width={16} fill='#000000' />}
        />
      )}
    </motion.div>
  );
};

export default Chip;
