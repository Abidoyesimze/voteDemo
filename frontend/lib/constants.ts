// Network Configuration
export const NETWORK_CONFIG = {
  name: 'Base Sepolia',
  chainId: 84532,
  rpcUrl: 'https://sepolia.base.org',
  blockExplorer: 'https://sepolia.basescan.org',
  currency: 'ETH',
} as const;

// Contract Configuration
export const CONTRACT_CONFIG = {
  address: '0x0c8cF958759f547a9Cc53Edceb428a8244aF4586',
  maxContenders: 3,
  minContendersToStart: 2,
} as const;

// App Configuration
export const APP_CONFIG = {
  name: 'QuickVote',
  description: 'Decentralized Voting Platform on Base',
  version: '1.0.0',
  refreshInterval: 5000, // 5 seconds
  transactionTimeout: 300000, // 5 minutes
} as const;

// UI Constants
export const UI_CONFIG = {
  animationDuration: 300,
  toastDuration: 5000,
  skeletonCount: 3,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INSUFFICIENT_FUNDS: 'Insufficient funds for transaction',
  USER_REJECTED: 'Transaction was rejected by user',
  CONTRACT_ERROR: 'Contract interaction failed',
  INVALID_ADDRESS: 'Invalid Ethereum address',
  INVALID_CODE: 'Code must be non-empty and unique',
  MAX_CONTENDERS_REACHED: 'Maximum number of contenders reached',
  VOTING_NOT_ACTIVE: 'Voting is not currently active',
  ALREADY_VOTED: 'You have already voted',
  INVALID_CONTENDER: 'Invalid contender code',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully',
  TRANSACTION_CONFIRMED: 'Transaction confirmed',
  REGISTRATION_SUCCESS: 'Contender registered successfully',
  BATCH_REGISTRATION_SUCCESS: 'All contenders registered successfully',
  VOTING_STARTED: 'Voting session started successfully',
  VOTING_ENDED: 'Voting session ended successfully',
  VOTE_CAST: 'Your vote has been cast successfully',
} as const;

// Validation Patterns
export const VALIDATION = {
  ETH_ADDRESS: /^0x[a-fA-F0-9]{40}$/,
  CODE: /^[A-Z0-9_]{1,20}$/,
} as const;









