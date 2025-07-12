import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';

interface ChipProps {
  id: string;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion';
  onClick: () => void;
}

const chipStyle = tv({
  base: 'rounded-[100px] flex items-center justify-center border text-xs h-8 cursor-pointer p-2',
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

const Chip = ({ id, content, isSelected, type, onClick }: ChipProps) => {
  return (
    <motion.div
      className={chipStyle({ isSelected, type })}
      onClick={onClick}
      layoutId={`${id}`}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {type === 'category' ? content : '#' + content}
    </motion.div>
  );
};

export default Chip;
