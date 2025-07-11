import { tv } from 'tailwind-variants';

interface ChipProps {
  content: string;
  isSelected: boolean;
  type: 'category' | 'tag' | 'suggestion';
}

const chipStyle = tv({
  base: 'rounded-[100px] flex items-center justify-center border text-xs h-8',
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
      class: 'bg-grayBg border-black',
    },
    {
      type: 'tag',
      isSelected: false,
      class: 'bg-grayBg border-grayBorder',
    },
    {
      type: 'suggestion',
      isSelected: true,
      class: 'bg-lightPrimary border-primary',
    },
    {
      type: 'suggestion',
      isSelected: false,
      class: 'bg-grayBg border-grayBorder',
    },
  ],
});

const Chip = ({ content, isSelected, type }: ChipProps) => {
  return (
    <div className={chipStyle({ isSelected, type })}>
      {type === 'category' ? content : '#' + content}
    </div>
  );
};

export default Chip;
