import { BrowserProvider, Contract } from 'ethers';
import { VotingContract } from '@/app/abi';

export const CONTRACT_ADDRESS = VotingContract.address;
const VotingContractABI = VotingContract.abi;

export interface ContDetails {
  contender: string;
  code: string;
  votersNo: number;
  registered: boolean;
}

export function getVotingContract(provider: any) {
  const ethersProvider = new BrowserProvider(provider);
  return new Contract(CONTRACT_ADDRESS, VotingContractABI, ethersProvider);
}

export async function getVotingContractWithSigner(provider: any) {
  const ethersProvider = new BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();
  return new Contract(CONTRACT_ADDRESS, VotingContractABI, signer);
}

