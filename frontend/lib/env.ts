/**
 * Environment configuration helper
 * Provides type-safe access to environment variables
 */

export const env = {
  // Reown AppKit
  reownProjectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '',
  
  // Contract
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0c8cF958759f547a9Cc53Edceb428a8244aF4586',
  
  // Network
  networkName: process.env.NEXT_PUBLIC_NETWORK_NAME || 'Base Sepolia',
  networkChainId: parseInt(process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID || '84532', 10),
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.base.org',
  blockExplorer: process.env.NEXT_PUBLIC_BLOCK_EXPLORER || 'https://sepolia.basescan.org',
  
  // App
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'QuickVote',
  appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Decentralized Voting Platform on Base',
  
  // Feature Flags
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

/**
 * Validate required environment variables
 */
export function validateEnv(): { isValid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  if (!env.reownProjectId) {
    missing.push('NEXT_PUBLIC_REOWN_PROJECT_ID');
  }
  
  return {
    isValid: missing.length === 0,
    missing,
  };
}

