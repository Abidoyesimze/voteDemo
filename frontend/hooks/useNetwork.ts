import { useState, useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { BrowserProvider } from 'ethers';
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
  const { isConnected } = useAppKitAccount();
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    chainId: NETWORK_CONFIG.chainId,
    name: NETWORK_CONFIG.name,
    isCorrect: false,
  });

  useEffect(() => {
    const getChainId = async () => {
      if (!isConnected || typeof window === 'undefined' || !window.ethereum) {
        setNetworkInfo({
          chainId: NETWORK_CONFIG.chainId,
          name: NETWORK_CONFIG.name,
          isCorrect: false,
        });
        return;
      }

      try {
        const provider = new BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId);
        const isCorrect = chainId === NETWORK_CONFIG.chainId;
        
        setNetworkInfo({
          chainId,
          name: isCorrect ? NETWORK_CONFIG.name : `Unknown Network (${chainId})`,
          isCorrect,
        });
      } catch (error) {
        console.error('Error getting network:', error);
        setNetworkInfo({
          chainId: NETWORK_CONFIG.chainId,
          name: NETWORK_CONFIG.name,
          isCorrect: false,
        });
      }
    };

    getChainId();
    
    // Listen for chain changes
    if (window.ethereum && window.ethereum.on) {
      window.ethereum.on('chainChanged', getChainId);
      return () => {
        if (window.ethereum?.removeListener) {
          window.ethereum.removeListener('chainChanged', getChainId);
        }
      };
    }
  }, [isConnected]);

  return networkInfo;
}

/**
 * Hook to check if user is on correct network
 */
export function useIsCorrectNetwork(): boolean {
  const { isCorrect } = useNetwork();
  return isCorrect;
}
