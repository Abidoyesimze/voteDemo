/**
 * Type definitions for voting system
 */

export interface ContenderDetails {
  contender: string;
  code: string;
  votersNo: number;
  registered: boolean;
}

export interface VotingStatus {
  active: boolean;
  startTime: number;
  endTime: number;
}

export interface Winner {
  winner: string;
  code: string;
  voteCount: number;
}

export interface TransactionReceipt {
  hash: string;
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  from: string;
  to: string;
  gasUsed: bigint;
  effectiveGasPrice: bigint;
  status: number;
}

export interface VotingSession {
  id: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  contenderCount: number;
  totalVotes: number;
}

export interface VoteRecord {
  voter: string;
  contender: string;
  code: string;
  timestamp: number;
  txHash: string;
}

export interface Contender {
  code: string;
  address: string;
  voteCount: number;
}









