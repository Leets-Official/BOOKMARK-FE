import React from 'react';
import { tv } from 'tailwind-variants'; // tailwind-variants 모듈
import classNames from 'classnames'; // 조건부 클래스 조합할 때 사용

// 버튼 스타일 변형 정의 (variant와 size에 따라 클래스 분기)

import { tv } from 'tailwind-variants'; // tailwind-variants: 조건에 따라 Tailwind 클래스 조합 생성
import classNames from 'classnames'; // classNames: 다수의 클래스 문자열을 깔끔하게 합치는 유틸

// 버튼의 스타일 variant 및 크기 size에 따라 Tailwind 클래스를 자동으로 조합

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

    variant: 'primary', // 기본 스타일은 primary
    size: 'md', // 기본 사이즈는 medium
  },
});

// Button 컴포넌트에서 사용할 prop의 타입 정의
interface ButtonProps {
  children?: React.ReactNode; // 버튼 안에 들어갈 내용 (텍스트 or 아이콘 등)
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; // 버튼 스타일 종류
  size?: 'sm' | 'md' | 'lg'; // 버튼 크기 종류
  isLoading?: boolean; // 로딩 중 여부
  icon?: React.ReactNode; // 버튼 왼쪽에 표시할 아이콘
  className?: string; // 추가 클래스명 전달
  onClick?: () => void; // 클릭 이벤트 핸들러
  disabled?: boolean; // 비활성화 여부
  type?: 'button' | 'submit' | 'reset'; // 버튼 타입
}

// 실제 버튼 컴포넌트 정의
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type} // 기본값은 'button'
      className={classNames(buttonVariants({ variant, size }), className)} // 동적 클래스 조합
      onClick={onClick} // 클릭 시 실행할 함수
      disabled={isLoading || disabled} // 로딩 중이거나 disabled면 비활성화
    >
      {/* 로딩 중이면 "Loading..."만 표시 */}

      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>

          {icon && <span className='mr-2'>{icon}</span>}
          {children}

          {/* 아이콘이 있으면 왼쪽에 띄우고 여백 추가 */}
          {icon && <span className="mr-2">{icon}</span>}
          {children} {/* 버튼의 텍스트 or 내용 */}

        </>
      )}
    </button>
  );
};

export default Button;
