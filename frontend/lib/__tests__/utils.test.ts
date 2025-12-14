import {
  formatAddress,
  isValidAddress,
  isValidCode,
  copyToClipboard,
  formatTimeRemaining,
  formatDate,
  calculatePercentage,
  truncateText,
  debounce,
  sleep,
  getBlockExplorerUrl,
  getTransactionUrl,
  parseErrorMessage,
} from '../utils';

describe('formatAddress', () => {
  it('should format address correctly', () => {
    const address = '0x1234567890123456789012345678901234567890';
    expect(formatAddress(address)).toBe('0x1234...7890');
  });

  it('should return empty string for empty address', () => {
    expect(formatAddress('')).toBe('');
  });

  it('should return full address if shorter than default length', () => {
    const shortAddress = '0x1234';
    expect(formatAddress(shortAddress)).toBe(shortAddress);
  });

  it('should respect custom start and end lengths', () => {
    const address = '0x1234567890123456789012345678901234567890';
    expect(formatAddress(address, 4, 2)).toBe('0x12...90');
  });
});

describe('isValidAddress', () => {
  it('should validate correct Ethereum address', () => {
    expect(isValidAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')).toBe(true);
  });

  it('should reject invalid address', () => {
    expect(isValidAddress('invalid')).toBe(false);
    expect(isValidAddress('0x123')).toBe(false);
  });
});

describe('isValidCode', () => {
  it('should validate correct code', () => {
    expect(isValidCode('ABC123')).toBe(true);
  });

  it('should reject empty code', () => {
    expect(isValidCode('')).toBe(false);
  });

  it('should reject code longer than 20 characters', () => {
    expect(isValidCode('A'.repeat(21))).toBe(false);
  });
});

describe('formatTimeRemaining', () => {
  it('should format days correctly', () => {
    expect(formatTimeRemaining(172800)).toBe('2d 0h 0m');
  });

  it('should format hours correctly', () => {
    expect(formatTimeRemaining(3661)).toBe('1h 1m 1s');
  });

  it('should format minutes correctly', () => {
    expect(formatTimeRemaining(125)).toBe('2m 5s');
  });

  it('should format seconds correctly', () => {
    expect(formatTimeRemaining(45)).toBe('45s');
  });

  it('should return "Ended" for zero or negative time', () => {
    expect(formatTimeRemaining(0)).toBe('Ended');
    expect(formatTimeRemaining(-10)).toBe('Ended');
  });
});

describe('formatDate', () => {
  it('should format timestamp correctly', () => {
    const timestamp = 1609459200; // 2021-01-01 00:00:00 UTC
    const formatted = formatDate(timestamp);
    expect(formatted).toContain('Jan');
    expect(formatted).toContain('2021');
  });
});

describe('calculatePercentage', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(25, 100)).toBe('25.0');
    expect(calculatePercentage(1, 3)).toBe('33.3');
  });

  it('should return 0.0 for zero total', () => {
    expect(calculatePercentage(10, 0)).toBe('0.0');
  });

  it('should respect decimal places', () => {
    expect(calculatePercentage(1, 3, 2)).toBe('33.33');
  });
});

describe('truncateText', () => {
  it('should truncate long text', () => {
    const text = 'This is a very long text that needs to be truncated';
    expect(truncateText(text, 20)).toBe('This is a very lo...');
  });

  it('should return full text if shorter than max length', () => {
    const text = 'Short text';
    expect(truncateText(text, 20)).toBe(text);
  });

  it('should use custom suffix', () => {
    const text = 'Long text here';
    expect(truncateText(text, 10, '...')).toBe('Long te...');
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  it('should debounce function calls', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});

describe('sleep', () => {
  it('should resolve after delay', async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(90);
  });
});

describe('getBlockExplorerUrl', () => {
  it('should generate correct URL', () => {
    const address = '0x1234567890123456789012345678901234567890';
    expect(getBlockExplorerUrl(address)).toBe(
      'https://sepolia.basescan.org/address/0x1234567890123456789012345678901234567890'
    );
  });
});

describe('getTransactionUrl', () => {
  it('should generate correct transaction URL', () => {
    const txHash = '0xabcdef1234567890';
    expect(getTransactionUrl(txHash)).toBe('https://sepolia.basescan.org/tx/0xabcdef1234567890');
  });
});

describe('parseErrorMessage', () => {
  it('should parse string errors', () => {
    expect(parseErrorMessage('Simple error')).toBe('Simple error');
  });

  it('should parse Error objects', () => {
    const error = new Error('user rejected');
    expect(parseErrorMessage(error)).toBe('Transaction was rejected');
  });

  it('should handle unknown error types', () => {
    expect(parseErrorMessage(null)).toBe('An unexpected error occurred');
  });
});

