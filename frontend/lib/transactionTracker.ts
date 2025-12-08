/**
 * Transaction tracking utilities
 */

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  type: 'vote' | 'register' | 'startVoting' | 'endVoting' | 'batchRegister';
  data?: Record<string, any>;
}

class TransactionTracker {
  private transactions: Map<string, TransactionStatus> = new Map();

  /**
   * Add a new transaction
   */
  addTransaction(
    hash: string,
    type: TransactionStatus['type'],
    data?: Record<string, any>
  ): void {
    this.transactions.set(hash, {
      hash,
      status: 'pending',
      timestamp: Date.now(),
      type,
      data,
    });

    // Persist to localStorage
    this.saveToStorage();
  }

  /**
   * Update transaction status
   */
  updateTransaction(hash: string, status: 'confirmed' | 'failed'): void {
    const transaction = this.transactions.get(hash);
    if (transaction) {
      transaction.status = status;
      this.transactions.set(hash, transaction);
      this.saveToStorage();
    }
  }

  /**
   * Get transaction by hash
   */
  getTransaction(hash: string): TransactionStatus | undefined {
    return this.transactions.get(hash);
  }

  /**
   * Get all transactions
   */
  getAllTransactions(): TransactionStatus[] {
    return Array.from(this.transactions.values()).sort(
      (a, b) => b.timestamp - a.timestamp
    );
  }

  /**
   * Get transactions by type
   */
  getTransactionsByType(type: TransactionStatus['type']): TransactionStatus[] {
    return this.getAllTransactions().filter(tx => tx.type === type);
  }

  /**
   * Clear all transactions
   */
  clearTransactions(): void {
    this.transactions.clear();
    this.saveToStorage();
  }

  /**
   * Save to localStorage
   */
  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const data = Array.from(this.transactions.values());
        window.localStorage.setItem('quickvote_transactions', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save transactions to localStorage:', error);
      }
    }
  }

  /**
   * Load from localStorage
   */
  loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const data = window.localStorage.getItem('quickvote_transactions');
        if (data) {
          const transactions: TransactionStatus[] = JSON.parse(data);
          transactions.forEach(tx => {
            this.transactions.set(tx.hash, tx);
          });
        }
      } catch (error) {
        console.error('Failed to load transactions from localStorage:', error);
      }
    }
  }
}

// Singleton instance
export const transactionTracker = new TransactionTracker();

// Load from storage on initialization
if (typeof window !== 'undefined') {
  transactionTracker.loadFromStorage();
}

