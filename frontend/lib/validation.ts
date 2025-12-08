import { VALIDATION, ERROR_MESSAGES } from './constants';
import { isValidAddress, isValidCode } from './utils';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate Ethereum address
 */
export function validateAddress(address: string): ValidationResult {
  if (!address || address.trim() === '') {
    return { isValid: false, error: 'Address is required' };
  }

  if (!isValidAddress(address)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_ADDRESS };
  }

  return { isValid: true };
}

/**
 * Validate contender code
 */
export function validateCode(code: string): ValidationResult {
  if (!code || code.trim() === '') {
    return { isValid: false, error: 'Code is required' };
  }

  if (!isValidCode(code)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_CODE };
  }

  return { isValid: true };
}

/**
 * Validate voting duration
 */
export function validateDuration(duration: string, unit: 'seconds' | 'minutes' | 'hours'): ValidationResult {
  const num = parseInt(duration, 10);

  if (!duration || duration.trim() === '') {
    return { isValid: false, error: 'Duration is required' };
  }

  if (isNaN(num) || num <= 0) {
    return { isValid: false, error: 'Duration must be a positive number' };
  }

  if (unit === 'seconds' && num < 60) {
    return { isValid: false, error: 'Duration must be at least 60 seconds' };
  }

  if (unit === 'minutes' && num < 1) {
    return { isValid: false, error: 'Duration must be at least 1 minute' };
  }

  if (unit === 'hours' && num > 8760) {
    return { isValid: false, error: 'Duration cannot exceed 1 year' };
  }

  return { isValid: true };
}

/**
 * Validate batch registration inputs
 */
export function validateBatchRegistration(
  addresses: string[],
  codes: string[]
): ValidationResult {
  if (addresses.length !== 3 || codes.length !== 3) {
    return { isValid: false, error: 'All 3 contenders must be provided' };
  }

  // Check for empty fields
  for (let i = 0; i < 3; i++) {
    if (!addresses[i] || addresses[i].trim() === '') {
      return { isValid: false, error: `Contender ${i + 1} address is required` };
    }
    if (!codes[i] || codes[i].trim() === '') {
      return { isValid: false, error: `Contender ${i + 1} code is required` };
    }
  }

  // Validate addresses
  for (let i = 0; i < 3; i++) {
    const addressResult = validateAddress(addresses[i]);
    if (!addressResult.isValid) {
      return { isValid: false, error: `Contender ${i + 1}: ${addressResult.error}` };
    }
  }

  // Validate codes
  for (let i = 0; i < 3; i++) {
    const codeResult = validateCode(codes[i]);
    if (!codeResult.isValid) {
      return { isValid: false, error: `Contender ${i + 1}: ${codeResult.error}` };
    }
  }

  // Check for duplicate addresses
  const uniqueAddresses = new Set(addresses.map(a => a.toLowerCase()));
  if (uniqueAddresses.size !== addresses.length) {
    return { isValid: false, error: 'All addresses must be unique' };
  }

  // Check for duplicate codes
  const uniqueCodes = new Set(codes.map(c => c.toUpperCase()));
  if (uniqueCodes.size !== codes.length) {
    return { isValid: false, error: 'All codes must be unique' };
  }

  return { isValid: true };
}

/**
 * Validate single registration inputs
 */
export function validateSingleRegistration(
  address: string,
  code: string
): ValidationResult {
  const addressResult = validateAddress(address);
  if (!addressResult.isValid) {
    return addressResult;
  }

  const codeResult = validateCode(code);
  if (!codeResult.isValid) {
    return codeResult;
  }

  return { isValid: true };
}

