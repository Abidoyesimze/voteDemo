/**
 * Application constants
 */

export const APP_NAME = 'QuickVote';
export const APP_DESCRIPTION = 'Decentralized Voting on Base';
export const APP_VERSION = '1.0.0';

export const NETWORKS = {
  BASE_SEPOLIA: {
    name: 'Base Sepolia',
    chainId: 84532,
    rpcUrl: 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
  },
} as const;

export const VOTING_CONSTANTS = {
  MAX_CONTENDERS: 3,
  MIN_VOTING_DURATION: 60, // seconds
  MAX_VOTING_DURATION: 86400 * 7, // 7 days in seconds
  POLLING_INTERVAL: 5000, // 5 seconds
} as const;

export const STORAGE_KEYS = {
  THEME: 'theme',
  WALLET_ADDRESS: 'wallet_address',
  LAST_VISITED: 'last_visited',
} as const;

export const ROUTES = {
  HOME: '/',
  VOTE: '/vote',
  ABOUT: '/about',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 150,
  BASE: 200,
  SLOW: 300,
  SLOWER: 500,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
