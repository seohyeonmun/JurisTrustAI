import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`bg-surface-card border border-outline-variant rounded-xl shadow-sm ${noPadding ? '' : 'p-8'} ${className}`}>
      {children}
    </div>
  );
};
