import { BrowserProvider, Contract } from 'ethers';
import { VotingContract } from '@/app/abi';
import { CONTRACT_CONFIG } from './constants';

export const CONTRACT_ADDRESS = VotingContract.address || CONTRACT_CONFIG.address;
const VotingContractABI = VotingContract.abi;

export interface ContDetails {
  contender: string;
  code: string;
  votersNo: number;
  registered: boolean;
}

/**
 * Get voting contract instance (read-only)
 * @param provider - Ethereum provider
 * @returns Contract instance
 * @throws Error if provider is invalid
 */
export function getVotingContract(provider: any): Contract {
  if (!provider) {
    throw new Error('Provider is required');
  }

  try {
    const ethersProvider = new BrowserProvider(provider);
    return new Contract(CONTRACT_ADDRESS, VotingContractABI, ethersProvider);
  } catch (error) {
    throw new Error(`Failed to create contract instance: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get voting contract instance with signer (for transactions)
 * @param provider - Ethereum provider
 * @returns Contract instance with signer
 * @throws Error if provider is invalid or signer cannot be obtained
 */
export async function getVotingContractWithSigner(provider: any): Promise<Contract> {
  if (!provider) {
    throw new Error('Provider is required');
  }

  try {
    const ethersProvider = new BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    
    if (!signer) {
      throw new Error('Failed to get signer from provider');
    }

    return new Contract(CONTRACT_ADDRESS, VotingContractABI, signer);
  } catch (error) {
    throw new Error(`Failed to create contract instance with signer: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate contract address
 * @param address - Contract address to validate
 * @returns True if address matches expected contract address
 */
export function isValidContractAddress(address: string): boolean {
  return address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase();
}

/**
 * Get contract info
 */
export function getContractInfo() {
  return {
    address: CONTRACT_ADDRESS,
    network: 'Base Sepolia',
    chainId: 84532,
    blockExplorer: `https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}`,
  };
}
