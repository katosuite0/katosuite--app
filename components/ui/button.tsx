'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  secondary:
    'bg-white text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50 focus-visible:ring-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  ghost:
    'text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
