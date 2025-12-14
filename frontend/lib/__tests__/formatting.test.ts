import {
  formatAddress,
  formatTimeRemaining,
  formatDate,
  calculatePercentage,
  truncateText,
} from '../utils';

describe('Formatting Utilities', () => {
  describe('formatAddress', () => {
    it('should format addresses correctly', () => {
      const address = '0x1234567890123456789012345678901234567890';
      expect(formatAddress(address)).toBe('0x1234...7890');
    });

    it('should handle short addresses', () => {
      expect(formatAddress('0x123')).toBe('0x123');
    });
  });

  describe('formatTimeRemaining', () => {
    it('should format various time periods', () => {
      expect(formatTimeRemaining(86400)).toBe('1d 0h 0m');
      expect(formatTimeRemaining(3661)).toBe('1h 1m 1s');
      expect(formatTimeRemaining(125)).toBe('2m 5s');
      expect(formatTimeRemaining(45)).toBe('45s');
    });
  });

  describe('formatDate', () => {
    it('should format timestamps', () => {
      const timestamp = 1609459200;
      const formatted = formatDate(timestamp);
      expect(formatted).toContain('Jan');
    });
  });

  describe('calculatePercentage', () => {
    it('should calculate percentages correctly', () => {
      expect(calculatePercentage(25, 100)).toBe('25.0');
      expect(calculatePercentage(1, 3, 2)).toBe('33.33');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text';
      expect(truncateText(text, 10)).toBe('This is a ...');
    });
  });
});

