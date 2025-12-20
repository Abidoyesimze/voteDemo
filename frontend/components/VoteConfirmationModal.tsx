'use client';

import { Modal } from './ui/Modal';
import Button from './ui/Button';

interface VoteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contenderCode: string;
  contenderAddress: string;
  isLoading?: boolean;
}

export default function VoteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  contenderCode,
  contenderAddress,
  isLoading = false,
}: VoteConfirmationModalProps) {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Your Vote">
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Confirm Your Vote
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You are about to vote for:
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contender Code</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{contenderCode}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Address</span>
            <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{formatAddress(contenderAddress)}</span>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                Important Notice
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                This action cannot be undone. Once you vote, you cannot change your selection. Make sure this is your final choice.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            isLoading={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? 'Confirming...' : 'Confirm Vote'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

