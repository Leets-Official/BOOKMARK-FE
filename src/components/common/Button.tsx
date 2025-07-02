import React from 'react';
import { tv } from 'tailwind-variants'; // tailwind-variants: 조건에 따라 Tailwind 클래스 조합 생성
import { clsx } from 'clsx';

// 버튼의 스타일 variant 및 크기 size에 따라 Tailwind 클래스를 자동으로 조합
const buttonVariants = tv({
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white hover:brightness-90 disabled:brightness-80',
      secondary: 'bg-gray-500 text-white hover:brightness-90 disabled:brightness-80',
      danger: 'bg-red-500 text-white hover:brightness-90 disabled:brightness-80',
      ghost:
        'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-60',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary', // 기본 스타일은 primary
    size: 'md', // 기본 사이즈는 medium
  },
});

// Button 컴포넌트에서 사용할 prop의 타입 정의
interface ButtonProps {
  children?: string; // 버튼 안에 들어갈 내용 (텍스트 or 아이콘 등)
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; // 버튼 스타일 종류
  size?: 'sm' | 'md' | 'lg'; // 버튼 크기 종류
  isLoading?: boolean; // 로딩 중 여부
  icon?: React.ReactNode; // 버튼 왼쪽에 표시할 아이콘
  className?: string; // 추가 클래스명 전달
  onClick: () => void; // 클릭 이벤트 핸들러
  disabled?: boolean; // 비활성화 여부
  type?: 'button' | 'submit' | 'reset'; // 버튼 타입
}

// 실제 버튼 컴포넌트 정의
const Button = ({
  children,
  variant,
  size,
  isLoading,
  icon,
  className,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(buttonVariants({ variant, size }), className)}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
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
