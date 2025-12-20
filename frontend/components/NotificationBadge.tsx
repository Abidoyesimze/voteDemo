'use client';

interface NotificationBadgeProps {
  count: number;
  max?: number;
  className?: string;
}

export default function NotificationBadge({
  count,
  max = 99,
  className = '',
}: NotificationBadgeProps) {
  if (count === 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 dark:bg-red-600 rounded-full ${className}`}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
}

