import { isValidAddress, isValidCode } from '../utils';

describe('Validation Utilities', () => {
  describe('isValidAddress', () => {
    it('should validate correct Ethereum addresses', () => {
      expect(isValidAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')).toBe(true);
      expect(isValidAddress('0x0000000000000000000000000000000000000000')).toBe(true);
    });

    it('should reject invalid addresses', () => {
      expect(isValidAddress('')).toBe(false);
      expect(isValidAddress('0x123')).toBe(false);
      expect(isValidAddress('not-an-address')).toBe(false);
      expect(isValidAddress('0xGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')).toBe(false);
    });
  });

  describe('isValidCode', () => {
    it('should validate correct codes', () => {
      expect(isValidCode('ABC123')).toBe(true);
      expect(isValidCode('A')).toBe(true);
      expect(isValidCode('A'.repeat(20))).toBe(true);
    });

    it('should reject invalid codes', () => {
      expect(isValidCode('')).toBe(false);
      expect(isValidCode('A'.repeat(21))).toBe(false);
    });
  });
});

