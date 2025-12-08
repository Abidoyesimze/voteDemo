import { parseErrorMessage } from './utils';
import { ERROR_MESSAGES } from './constants';

/**
 * Enhanced error message parser for contract interactions
 */
export function getContractErrorMessage(error: unknown): string {
  const message = parseErrorMessage(error);
  const lowerMessage = message.toLowerCase();

  // User rejection
  if (lowerMessage.includes('user rejected') || lowerMessage.includes('user denied')) {
    return ERROR_MESSAGES.USER_REJECTED;
  }

  // Insufficient funds
  if (
    lowerMessage.includes('insufficient funds') ||
    lowerMessage.includes('insufficient balance')
  ) {
    return ERROR_MESSAGES.INSUFFICIENT_FUNDS;
  }

  // Network errors
  if (
    lowerMessage.includes('network') ||
    lowerMessage.includes('connection') ||
    lowerMessage.includes('timeout')
  ) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // Contract-specific errors
  if (lowerMessage.includes('only owner')) {
    return 'Only the contract owner can perform this action';
  }

  if (lowerMessage.includes('voting is not active')) {
    return ERROR_MESSAGES.VOTING_NOT_ACTIVE;
  }

  if (lowerMessage.includes('already voted') || lowerMessage.includes('user already voted')) {
    return ERROR_MESSAGES.ALREADY_VOTED;
  }

  if (lowerMessage.includes('invalid contender') || lowerMessage.includes('contender not found')) {
    return ERROR_MESSAGES.INVALID_CONTENDER;
  }

  if (lowerMessage.includes('maximum contenders')) {
    return ERROR_MESSAGES.MAX_CONTENDERS_REACHED;
  }

  if (lowerMessage.includes('code already exists')) {
    return 'This code is already in use. Please choose a different code.';
  }

  if (lowerMessage.includes('contender already registered')) {
    return 'This address is already registered as a contender.';
  }

  if (lowerMessage.includes('need at least 2 contenders')) {
    return 'At least 2 contenders are required to start voting.';
  }

  if (lowerMessage.includes('voting is still active')) {
    return 'Voting is currently active. Please wait for it to end.';
  }

  // Gas estimation errors
  if (lowerMessage.includes('gas') || lowerMessage.includes('execution reverted')) {
    return 'Transaction would fail. Please check your inputs and try again.';
  }

  // Replacement fee errors
  if (lowerMessage.includes('replacement fee') || lowerMessage.includes('nonce')) {
    return 'A transaction is already pending. Please wait for it to complete.';
  }

  // Default fallback
  return message || ERROR_MESSAGES.CONTRACT_ERROR;
}

/**
 * Get user-friendly error message with suggestions
 */
export function getErrorWithSuggestion(error: unknown): {
  message: string;
  suggestion?: string;
} {
  const message = getContractErrorMessage(error);
  const lowerMessage = message.toLowerCase();

  let suggestion: string | undefined;

  if (lowerMessage.includes('insufficient funds')) {
    suggestion = 'Make sure you have enough ETH in your wallet for gas fees.';
  } else if (lowerMessage.includes('network')) {
    suggestion = 'Check your internet connection and try switching networks.';
  } else if (lowerMessage.includes('user rejected')) {
    suggestion = 'Please approve the transaction in your wallet to continue.';
  } else if (lowerMessage.includes('only owner')) {
    suggestion = 'This action can only be performed by the contract owner.';
  }

  return { message, suggestion };
}

