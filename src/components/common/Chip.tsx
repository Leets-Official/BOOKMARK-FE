import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import Button from './Button';
import { Delete } from '@/assets';

interface ChipProps {
  id: string;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion';
  onClick: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const chipStyle = tv({
  base: 'rounded-[100px] flex items-center justify-center border text-xs h-8 p-2',
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
  return (
    <motion.div
      className={
        chipStyle({ isSelected, type }) + (disabled ? '' : ' cursor-pointer') + ' group relative'
      }
      layoutId={`${id}`}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
    >
      {type === 'category' ? content : '#' + content}
      <Button
        className='absolute right-0 top-0'
        onClick={() => { }}
        icon={<Delete height={16} width={16} />}
      />
    </motion.div>
  );
};

export default Chip;
