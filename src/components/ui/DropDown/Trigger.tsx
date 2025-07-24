import React, { forwardRef } from 'react';

interface DropDownTriggerProps {
  children: React.ReactNode;
  // 드랍다운 트레거 클릭 시 실행할 함수 (Open, Close)
  onClick: () => void;
}

const DropDownTrigger = forwardRef<HTMLButtonElement, DropDownTriggerProps>(
  function DropDownTrigger({ children, onClick }, ref) {
    // ref는 부모가 전달한 ref
    const onClickHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Escape') onClick();
    };
    return (
      <button ref={ref} onClick={onClick} onKeyDown={onClickHandler} type='button'>
        {children}
      </button>
    );
  },
);

export default DropDownTrigger;
