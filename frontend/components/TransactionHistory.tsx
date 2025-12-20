'use client';

import { useState, useEffect } from 'react';
import { transactionTracker, TransactionStatus } from '@/lib/transactionTracker';
import { formatDate, getTransactionUrl } from '@/lib/utils';
import Card from './ui/Card';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<TransactionStatus[]>([]);

  useEffect(() => {
    const loadTransactions = () => {
      const allTransactions = transactionTracker.getAllTransactions();
      setTransactions(allTransactions);
    };

    loadTransactions();
    const interval = setInterval(loadTransactions, 5000);
    return () => clearInterval(interval);
  }, []);

  if (transactions.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Transaction History</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">No transactions yet</p>
      </Card>
    );
  }

  const getStatusColor = (status: TransactionStatus['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    }
  };

  const getTypeLabel = (type: TransactionStatus['type']) => {
    switch (type) {
      case 'vote':
        return 'Vote';
      case 'register':
        return 'Register Contender';
      case 'batchRegister':
        return 'Batch Register';
      case 'startVoting':
        return 'Start Voting';
      case 'endVoting':
        return 'End Voting';
      default:
        return type;
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Transaction History</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map(tx => (
          <div
            key={tx.hash}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {getTypeLabel(tx.type)}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(tx.status)}`}
                >
                  {tx.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">{tx.hash}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formatDate(tx.timestamp / 1000)}</p>
            </div>
            <a
              href={getTransactionUrl(tx.hash)}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              aria-label="View transaction on block explorer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </Card>
  );
}









