import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-on-surface-variant">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
            <Icon size={20} />
          </div>
        )}
        <input
          className={`
            w-full py-3 bg-white border border-border-hairline rounded-lg 
            focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all
            placeholder:text-outline-variant text-sm
            ${Icon ? 'pl-10 pr-4' : 'px-4'}
            ${error ? 'border-red-500 focus:ring-red-500/10 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
      {helperText && !error && <span className="text-xs text-on-surface-variant opacity-70">{helperText}</span>}
    </div>
  );
};
