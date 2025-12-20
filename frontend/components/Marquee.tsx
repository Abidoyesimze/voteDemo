'use client';

import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = false,
  className = '',
}: MarqueeProps) {
  const speedClasses = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  };

  const directionClasses = {
    left: 'animate-marquee-left',
    right: 'animate-marquee-right',
    up: 'animate-marquee-up',
    down: 'animate-marquee-down',
  };

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className={`inline-block ${speedClasses[speed]} ${pauseOnHover ? 'hover:pause' : ''}`}
      >
        <div className="inline-flex items-center gap-8">
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}

