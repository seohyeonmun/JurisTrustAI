import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'vibrant';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90 shadow-md rounded-lg',
    secondary: 'bg-surface-container-low text-ink hover:bg-surface-container border border-border-hairline rounded-lg',
    outline: 'bg-transparent border border-border-hairline text-on-surface-variant hover:bg-surface-container-low rounded-lg',
    ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-low rounded-lg',
    danger: 'bg-transparent border border-red-500 text-red-500 hover:bg-red-50 rounded-lg',
    vibrant: 'vibrant-button',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
