'use client';

import AnimatedLoader from './AnimatedLoader';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingOverlay({
  isLoading,
  message = 'Loading...',
  fullScreen = false,
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50'
    : 'absolute inset-0 z-40';

  return (
    <div className={`${containerClasses} bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center`}>
      <div className="text-center">
        <AnimatedLoader size="lg" color="primary" text={message} />
      </div>
    </div>
  );
}

