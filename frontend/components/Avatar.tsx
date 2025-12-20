'use client';

interface AvatarProps {
  address: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({ address, size = 'md', className = '' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  // Generate a color based on the address
  const getColorFromAddress = (addr: string) => {
    const hash = addr.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const backgroundColor = getColorFromAddress(address);
  const initials = address.slice(2, 4).toUpperCase();

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white ${className}`}
      style={{ backgroundColor }}
      title={address}
    >
      {initials}
    </div>
  );
}

