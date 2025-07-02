import React from 'react';
import { tv } from 'tailwind-variants'; // tailwind-variants 모듈
import classNames from 'classnames'; // 조건부 클래스 조합할 때 사용

// 버튼 스타일 변형 정의 (variant와 size에 따라 클래스 분기)
const buttonVariants = tv({
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      ghost: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// 버튼 컴포넌트 props 타입 정의
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

// 버튼 컴포넌트 정의
const Button: React.FC<ButtonProps> = ({
  variant = 'primary', // 기본 스타일
  size = 'md', // 기본 크기
  isLoading = false, // 로딩 여부
  icon, // 아이콘 (선택)
  className, // 외부에서 전달받은 클래스
  children, // 버튼 내부 텍스트
  ...rest // 기타 나머지 props (예: type, onClick 등)
}) => {
  return (
    <button
      className={classNames(buttonVariants({ variant, size }), className)}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {/* 로딩 중이면 "Loading..." 텍스트 표시 */}
      {isLoading ? (
        <span>Loading...</span>
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
