/**
 * Ethereum address utility functions
 */

export function formatAddress(address: string, startLength: number = 6, endLength: number = 4): string {
  if (!address || address.length < startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function shortenAddress(address: string): string {
  return formatAddress(address, 6, 4);
}

export function getAddressExplorerUrl(address: string, network: string = 'base-sepolia'): string {
  const explorers: Record<string, string> = {
    'base-sepolia': `https://sepolia.basescan.org/address/${address}`,
    'base': `https://basescan.org/address/${address}`,
    'ethereum': `https://etherscan.io/address/${address}`,
  };
  return explorers[network] || explorers['base-sepolia'];
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  } finally {
    document.body.removeChild(textArea);
  }
}

