import React from 'react';

interface DropDownTriggerProps {
  children: React.ReactNode;
  // 드랍다운 트레거 클릭 시 실행할 함수 (Open, Close)
  onClick: () => void;
}

const DropDownTrigger = ({ children, onClick }: DropDownTriggerProps) => {
  const onClickHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      onClick();
    }
  };

  return (
    <button onClick={onClick} onKeyDown={onClickHandler}>
      {children}
    </button>
  );
};

export default DropDownTrigger;
