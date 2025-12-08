import { useState, useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { NETWORK_CONFIG } from '@/lib/constants';

interface NetworkInfo {
  chainId: number;
  name: string;
  isCorrect: boolean;
}

/**
 * Custom hook to detect and validate network connection
 */
export function useNetwork(): NetworkInfo {
  const { chainId } = useAppKitAccount();
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    chainId: NETWORK_CONFIG.chainId,
    name: NETWORK_CONFIG.name,
    isCorrect: false,
  });

  useEffect(() => {
    if (chainId) {
      const isCorrect = chainId === NETWORK_CONFIG.chainId;
      setNetworkInfo({
        chainId,
        name: isCorrect ? NETWORK_CONFIG.name : `Unknown Network (${chainId})`,
        isCorrect,
      });
    } else {
      setNetworkInfo({
        chainId: NETWORK_CONFIG.chainId,
        name: NETWORK_CONFIG.name,
        isCorrect: false,
      });
    }
  }, [chainId]);

  return networkInfo;
}

/**
 * Hook to check if user is on correct network
 */
export function useIsCorrectNetwork(): boolean {
  const { isCorrect } = useNetwork();
  return isCorrect;
}

