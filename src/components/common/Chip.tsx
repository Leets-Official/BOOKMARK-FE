import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import Button from './Button';
import { DeleteIcon } from '@/assets';

interface ChipProps {
  id: string;
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion' | 'platform';
  onClick?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  className?: string;
}

const chipStyle = tv({
  base: 'rounded-[100px] flex items-center justify-center border text-xs h-8 p-2 flex-row gap-1',
  variants: {
    isSelected: { true: '', false: '' },
    type: { category: '', tag: '', suggestion: '', platform: '' },
  },
  compoundVariants: [
    {
      type: 'category',
      isSelected: true,
      class: 'bg-gray-100 border-black',
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
      class: 'bg-white border-grayBorder text-grayText',
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
    {
      type: 'platform',
      isSelected: true,
      class: 'bg-gray-100 text-black border-black',
    },
    {
      type: 'platform',
      isSelected: false,
      class: 'bg-white text-black border-grayBorder',
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
  className,
}: ChipProps) => {
  return (
    <motion.div
      className={
        chipStyle({ isSelected, type }) +
        (disabled ? '' : ' cursor-pointer') +
        ' group relative ' +
        (className || '')
      }
      layoutId={`${id}`}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
    >
      <p>{type === 'tag' ? `#${content}` : content}</p>
      {onDelete && (
        <Button
          onClick={() => {
            onDelete?.();
          }}
          icon={<DeleteIcon height={16} width={16} fill='#000000' />}
        />
      )}
    </motion.div>
  );
};

export default Chip;
