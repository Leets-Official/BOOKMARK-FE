import { motion } from 'framer-motion';
import Button from './Button';
import { BackArrowIcon, DeleteIcon } from '@/assets';
import clsx from 'clsx';

// 이거 그냥 선택 시 색변 경 및 일반 색 변경 두 개를 props로 받아서 해결하자.
// 이거 후에 ChipDropDown 컴포넌트 완성
// 검색 완료 페이지 작성

interface ChipProps {
  content: string;
  className: string;
  isSelected: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  dropdownEnabled?: boolean;
  selectedClassName?: string;
}

const Chip = ({
  content,
  isSelected,
  onClick,
  onDelete,
  disabled = false,
  dropdownEnabled = false,
  className,
  selectedClassName,
}: ChipProps) => {
  const hoverAnimation = disabled ? undefined : { scale: 1.05 };
  const tapAnimation = disabled ? undefined : { scale: 0.95 };
  const handleClick = disabled ? undefined : onClick;

  return (
    <motion.div
      className={clsx(
        'rounded-[100px] flex items-center justify-center border text-xs h-8 p-2 flex-row gap-1',
        disabled ? '' : ' cursor-pointer',
        !isSelected ? className : selectedClassName,
        ' group relative',
      )}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      onClick={handleClick}
    >
      <p>{content}</p>
      {/* 삭제 함수가 있을시 활성화 */}
      {onDelete && (
        <Button
          onClick={() => {
            onDelete?.();
          }}
          icon={<DeleteIcon height={16} width={16} fill='#000000' />}
        />
      )}
      {/* Chip 드롭다운 옵션*/}
      {dropdownEnabled && (
        <motion.div
          animate={{
            rotate: !isSelected ? 90 : -90,
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
