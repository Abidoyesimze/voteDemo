'use client';

interface TransactionStatusProps {
  status: 'pending' | 'confirmed' | 'failed';
  txHash?: string;
  message?: string;
}

export default function TransactionStatus({
  status,
  txHash,
  message,
}: TransactionStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-300',
          icon: (
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
        };
      case 'confirmed':
        return {
          bg: 'bg-green-50 dark:bg-green-900/30',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-300',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case 'failed':
        return {
          bg: 'bg-red-50 dark:bg-red-900/30',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-300',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.bg} ${config.border} border-2 rounded-xl p-4`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${config.text}`}>
          {config.icon}
        </div>
        <div className="flex-1">
          <p className={`font-semibold ${config.text} mb-1`}>
            {status === 'pending' && 'Transaction Pending'}
            {status === 'confirmed' && 'Transaction Confirmed'}
            {status === 'failed' && 'Transaction Failed'}
          </p>
          {message && (
            <p className={`text-sm ${config.text} opacity-90 mb-2`}>
              {message}
            </p>
          )}
          {txHash && (
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs ${config.text} underline hover:opacity-80`}
            >
              View on BaseScan: {txHash.slice(0, 10)}...{txHash.slice(-8)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

