'use client';

import { useNetwork } from '@/hooks/useNetwork';
import { NETWORK_CONFIG } from '@/lib/constants';

export default function NetworkStatus() {
  const { isCorrectNetwork, chainId, isConnected } = useNetwork();

  if (!isConnected) {
    return null;
  }

  if (isCorrectNetwork) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
        <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></span>
        <span className="text-xs font-semibold text-green-700 dark:text-green-400">
          {NETWORK_CONFIG.name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
      <span className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full animate-pulse"></span>
      <span className="text-xs font-semibold text-red-700 dark:text-red-400">
        Wrong Network
      </span>
    </div>
  );
}

