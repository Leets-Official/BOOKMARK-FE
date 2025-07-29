// components/ui/cardLink/SaveButtonSection.tsx
import { tv } from 'tailwind-variants';
import { isSaveButtonDisabledAtom } from '@/atoms';
import { useAtomValue } from 'jotai';

const SaveButtonClass = tv({
  base: 'bg-blue text-base text-white text-center font-medium p-4 w-[90%] rounded-[10px]',
  variants: {
    isDisabled: {
      true: 'bg-lightBlueGray text-veryLightGray',
      false: 'bg-blue text-white cursor-pointer hover:brightness-90 transition',
    },
  },
});

interface SaveInterfaceProps {
  type: 'create' | 'edit';
}

const SaveButton = ({ type }: SaveInterfaceProps) => {
  const isSaveButtonDisabled = useAtomValue(isSaveButtonDisabledAtom);

  return (
    <div className='absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-8'>
      <button
        type='submit'
        form='save-form'
        className={SaveButtonClass({ isDisabled: isSaveButtonDisabled })}
        disabled={isSaveButtonDisabled}
      >
        {type === 'create' ? '저장하기' : '수정하기'}
      </button>
    </div>
  );
};

export default SaveButton;
