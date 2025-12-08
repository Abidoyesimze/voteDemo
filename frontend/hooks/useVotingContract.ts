'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { getVotingContract, getVotingContractWithSigner, type ContDetails, CONTRACT_ADDRESS } from '@/lib/contract';
import { getContractErrorMessage } from '@/lib/errorMessages';
import { transactionTracker } from '@/lib/transactionTracker';
import { analytics } from '@/lib/analytics';

export function useVotingContract() {
  const { address, isConnected } = useAppKitAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get provider from window.ethereum or AppKit
  const getProvider = useCallback(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      return window.ethereum;
    }
    return null;
  }, []);

  // Read contract functions
  const readContract = useCallback(async <T,>(fn: (contract: any) => Promise<T>): Promise<T | null> => {
    const provider = getProvider();
    if (!provider) return null;
    try {
      const contract = getVotingContract(provider);
      return await fn(contract);
    } catch (err: any) {
      console.error('Read contract error:', err);
      const errorMessage = getContractErrorMessage(err);
      setError(errorMessage);
      analytics.error(err, 'readContract');
      return null;
    }
  }, [getProvider]);

  // Write contract functions with improved error handling
  const writeContract = useCallback(async <T,>(
    fn: (contract: any) => Promise<T>,
    txType: 'vote' | 'register' | 'startVoting' | 'endVoting' | 'batchRegister'
  ): Promise<T | null> => {
    const provider = getProvider();
    if (!provider || !isConnected) {
      const errorMsg = 'Wallet not connected';
      setError(errorMsg);
      return null;
    }
    
    setLoading(true);
    setError(null);
    try {
      const contract = await getVotingContractWithSigner(provider);
      const result = await fn(contract);
      
      // Track transaction
      if (result && typeof result === 'object' && 'hash' in result) {
        const txHash = (result as any).hash;
        transactionTracker.addTransaction(txHash, txType);
        analytics.transaction('sent', txHash, txType);
        
        // Wait for confirmation
        if ('wait' in result && typeof (result as any).wait === 'function') {
          try {
            await (result as any).wait();
            transactionTracker.updateTransaction(txHash, 'confirmed');
            analytics.transaction('confirmed', txHash, txType);
          } catch (waitError) {
            transactionTracker.updateTransaction(txHash, 'failed');
            analytics.transaction('failed', txHash, txType);
            throw waitError;
          }
        }
      }
      
      setLoading(false);
      return result;
    } catch (err: any) {
      console.error('Write contract error:', err);
      const errorMessage = getContractErrorMessage(err);
      setError(errorMessage);
      analytics.error(err, `writeContract:${txType}`);
      setLoading(false);
      return null;
    }
  }, [getProvider, isConnected]);

  // Contract functions
  const vote = useCallback(async (code: string) => {
    return writeContract(async (contract) => {
      const tx = await contract.vote(code);
      await tx.wait();
      return tx;
    }, 'vote');
  }, [writeContract]);

  const registerContender = useCallback(async (contender: string, code: string) => {
    return writeContract(async (contract) => {
      const tx = await contract.registration(contender, code);
      await tx.wait();
      return tx;
    }, 'register');
  }, [writeContract]);

  const batchRegister = useCallback(async (contenders: [string, string, string], codes: [string, string, string]) => {
    return writeContract(async (contract) => {
      const tx = await contract.batchRegistration(contenders, codes);
      await tx.wait();
      return tx;
    }, 'batchRegister');
  }, [writeContract]);

  const startVoting = useCallback(async (durationInSeconds: number) => {
    return writeContract(async (contract) => {
      const tx = await contract.startVoting(durationInSeconds);
      await tx.wait();
      return tx;
    }, 'startVoting');
  }, [writeContract]);

  const endVoting = useCallback(async () => {
    return writeContract(async (contract) => {
      const tx = await contract.endVoting();
      await tx.wait();
      return tx;
    }, 'endVoting');
  }, [writeContract]);

  const declareWinner = useCallback(async () => {
    return writeContract(async (contract) => {
      const tx = await contract.declareWinner();
      await tx.wait();
      return tx;
    }, 'endVoting');
  }, [writeContract]);

  // Read functions
  const getVotingStatus = useCallback(async () => {
    return readContract(async (contract) => {
      return await contract.getVotingStatus();
    });
  }, [readContract]);

  const getOwner = useCallback(async () => {
    return readContract(async (contract) => {
      return await contract.owner();
    });
  }, [readContract]);

  const getContender = useCallback(async (code: string): Promise<ContDetails | null> => {
    return readContract(async (contract) => {
      return await contract.getContender(code);
    });
  }, [readContract]);

  const getAllContenders = useCallback(async () => {
    return readContract(async (contract) => {
      return await contract.getAllContenders();
    });
  }, [readContract]);

  const getAllContendersWithDetails = useCallback(async (): Promise<ContDetails[]> => {
    const provider = getProvider();
    if (!provider) return [];

    try {
      const contract = getVotingContract(provider);
      const contenderAddresses = await contract.getAllContenders();
      
      if (!contenderAddresses || contenderAddresses.length === 0) return [];

      const details = await Promise.all(
        contenderAddresses.map(async (addr: string) => {
          const detail = await contract.contenderdet(addr);
          return {
            contender: detail.contender,
            code: detail.code,
            votersNo: Number(detail.votersNo),
            registered: detail.registered,
          } as ContDetails;
        })
      );
      
      return details.filter((detail) => detail.registered);
    } catch (err: any) {
      console.error('Get all contenders error:', err);
      const errorMessage = getContractErrorMessage(err);
      setError(errorMessage);
      analytics.error(err, 'getAllContendersWithDetails');
      return [];
    }
  }, [getProvider]);

  const getWinner = useCallback(async () => {
    return readContract(async (contract) => {
      return await contract.getWinner();
    });
  }, [readContract]);

  const hasVoted = useCallback(async (voterAddress?: string) => {
    const addr = voterAddress || address;
    if (!addr) return false;
    return readContract(async (contract) => {
      return await contract.hasVoted(addr);
    });
  }, [readContract, address]);

  const getTotalVotes = useCallback(async () => {
    return readContract(async (contract) => {
      return await contract.getTotalVotes();
    });
  }, [readContract]);

  const isOwner = useCallback(async () => {
    if (!address) return false;
    const owner = await getOwner();
    return owner?.toLowerCase() === address.toLowerCase();
  }, [address, getOwner]);

  return {
    // State
    loading,
    error,
    isConnected,
    address,
    contractAddress: CONTRACT_ADDRESS,
    
    // Write functions
    vote,
    registerContender,
    batchRegister,
    startVoting,
    endVoting,
    declareWinner,
    
    // Read functions
    getVotingStatus,
    getOwner,
    getContender,
    getAllContenders,
    getAllContendersWithDetails,
    getWinner,
    hasVoted,
    getTotalVotes,
    isOwner,
  };
}
