'use client';

import { getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  emoji?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export default function Avatar({ name, src, emoji, size = 'md', className = '' }: AvatarProps) {
  if (emoji) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-surface-light flex items-center justify-center flex-shrink-0 ${className}`}>
        <span>{emoji}</span>
      </div>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-cyan/30 to-purple/30 flex items-center justify-center font-semibold text-white flex-shrink-0 ${className}`}>
      {getInitials(name)}
    </div>
  );
}
