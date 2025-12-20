'use client';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function StatusIndicator({
  status,
  size = 'md',
  showLabel = false,
  className = '',
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const statusClasses = {
    online: 'bg-green-500 dark:bg-green-400',
    offline: 'bg-gray-400 dark:bg-gray-500',
    away: 'bg-yellow-500 dark:bg-yellow-400',
    busy: 'bg-red-500 dark:bg-red-400',
  };

  const labels = {
    online: 'Online',
    offline: 'Offline',
    away: 'Away',
    busy: 'Busy',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className={`${sizeClasses[size]} ${statusClasses[status]} rounded-full ${
          status === 'online' ? 'animate-pulse' : ''
        }`}
        aria-label={labels[status]}
      />
      {showLabel && (
        <span className="text-sm text-gray-600 dark:text-gray-400">{labels[status]}</span>
      )}
    </div>
  );
}

