import { VALIDATION } from './constants';

/**
 * Format Ethereum address to shortened version
 * @param address - Full Ethereum address
 * @param startLength - Number of characters to show at start (default: 6)
 * @param endLength - Number of characters to show at end (default: 4)
 * @returns Formatted address string
 */
export function formatAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Validate Ethereum address format
 * @param address - Address to validate
 * @returns True if valid, false otherwise
 */
export function isValidAddress(address: string): boolean {
  return VALIDATION.ETH_ADDRESS.test(address);
}

/**
 * Validate contender code format
 * @param code - Code to validate
 * @returns True if valid, false otherwise
 */
export function isValidCode(code: string): boolean {
  return code.length > 0 && code.length <= 20 && VALIDATION.CODE.test(code);
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

/**
 * Format time remaining in human-readable format
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return 'Ended';
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

/**
 * Format timestamp to readable date
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Calculate percentage
 * @param value - Current value
 * @param total - Total value
 * @param decimals - Number of decimal places (default: 1)
 * @returns Percentage string
 */
export function calculatePercentage(
  value: number,
  total: number,
  decimals: number = 1
): string {
  if (total === 0) return '0.0';
  return ((value / total) * 100).toFixed(decimals);
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Sleep/delay function
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get block explorer URL for address
 * @param address - Ethereum address
 * @param network - Network name (default: 'sepolia')
 * @returns Block explorer URL
 */
export function getBlockExplorerUrl(
  address: string,
  network: string = 'sepolia'
): string {
  const baseUrl = `https://${network}.basescan.org`;
  return `${baseUrl}/address/${address}`;
}

/**
 * Get block explorer URL for transaction
 * @param txHash - Transaction hash
 * @param network - Network name (default: 'sepolia')
 * @returns Block explorer URL
 */
export function getTransactionUrl(
  txHash: string,
  network: string = 'sepolia'
): string {
  const baseUrl = `https://${network}.basescan.org`;
  return `${baseUrl}/tx/${txHash}`;
}

/**
 * Parse error message from contract interaction
 * @param error - Error object or string
 * @returns User-friendly error message
 */
export function parseErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  
  if (error instanceof Error) {
    const message = error.message;
    
    // Handle common error patterns
    if (message.includes('user rejected')) {
      return 'Transaction was rejected';
    }
    if (message.includes('insufficient funds')) {
      return 'Insufficient funds for transaction';
    }
    if (message.includes('network')) {
      return 'Network error. Please check your connection';
    }
    if (message.includes('replacement fee too low')) {
      return 'Transaction already pending. Please wait';
    }
    
    return message || 'An unexpected error occurred';
  }
  
  return 'An unexpected error occurred';
}

