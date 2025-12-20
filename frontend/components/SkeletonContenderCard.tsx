'use client';

import { Skeleton } from './Skeleton';

export default function SkeletonContenderCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton variant="circular" width={12} height={12} />
            <Skeleton variant="text" width="30%" height={28} />
          </div>
          <Skeleton variant="rectangular" width="70%" height={32} className="rounded-lg" />
        </div>
        <div className="text-right ml-4">
          <Skeleton variant="rectangular" width={60} height={48} className="rounded" />
          <Skeleton variant="text" width={40} height={12} className="mt-1 mx-auto" />
        </div>
      </div>
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <Skeleton variant="text" width={60} height={12} />
          <Skeleton variant="text" width={40} height={14} />
        </div>
        <Skeleton variant="rectangular" width="100%" height={12} className="rounded-full" />
      </div>
      <Skeleton variant="rectangular" width="100%" height={44} className="rounded-xl" />
    </div>
  );
}

export function SkeletonContenderGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonContenderCard key={i} />
      ))}
    </div>
  );
}

