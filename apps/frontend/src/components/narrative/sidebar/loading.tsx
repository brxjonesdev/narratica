'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  variant?: 'dots' | 'spinner' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export default function Loading({
  message = 'Loading',
  variant = 'dots',
  size = 'md',
  showIcon = true,
}: LoadingProps) {
  const [dots, setDots] = useState('');

  // Animated dots effect
  useEffect(() => {
    if (variant === 'dots') {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 400);

      return () => clearInterval(interval);
    }
  }, [variant]);

  // Size classes mapping
  const sizeClasses = {
    sm: 'text-sm py-1',
    md: 'text-base py-2',
    lg: 'text-lg py-3',
  };

  // Animation variant
  const getAnimationClass = () => {
    switch (variant) {
      case 'spinner':
        return '';
      case 'pulse':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-md bg-muted/50 px-4 ${sizeClasses[size]} ${getAnimationClass()}`}
    >
      {showIcon && variant === 'spinner' && (
        <Loader2
          className={`animate-spin ${size === 'sm' ? 'size-4' : size === 'md' ? 'size-5' : 'size-6'}`}
        />
      )}
      <span className="font-medium">{variant === 'dots' ? `${message}${dots}` : message}</span>
      {variant === 'pulse' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      )}
    </div>
  );
}
