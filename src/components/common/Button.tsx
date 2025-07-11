import React from 'react';

// Button 컴포넌트에서 사용할 prop의 타입 정의
interface ButtonProps {
  children?: string; // 버튼 안에 들어갈 내용 (텍스트 or 아이콘 등)
  isLoading?: boolean; // 로딩 중 여부
  icon?: React.ReactNode; // 버튼 왼쪽에 표시할 아이콘
  className?: string; // 추가 클래스명 전달
  onClick: () => void; // 클릭 이벤트 핸들러
  disabled?: boolean; // 비활성화 여부
}

// 실제 버튼 컴포넌트 정의
const Button = ({ children, isLoading, icon, className, onClick, disabled }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={isLoading || disabled}>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {icon && <span className='mr-2'>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
