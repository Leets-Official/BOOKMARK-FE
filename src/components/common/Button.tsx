// src/components/common/Button.tsx

import React from 'react';

interface ButtonProps {
  children?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'kakao';
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-500 text-white hover:brightness-90',
  secondary: 'bg-gray-200 text-black hover:brightness-90',
  ghost: 'bg-transparent text-black hover:opacity-70',
  kakao: 'bg-[#FEE500] text-black hover:brightness-90',
};

const Button = ({
  children,
  isLoading,
  icon,
  className = '',
  onClick,
  disabled,
  variant = 'primary',
}: ButtonProps) => {
  const variantClass = variantStyles[variant];

  return (
    <button
      className={`
        ${variantClass}
        ${className}
        flex items-center justify-center gap-2
        px-4 py-2 rounded transition duration-200
      `}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
