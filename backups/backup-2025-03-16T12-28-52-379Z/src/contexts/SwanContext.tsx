import React, { createContext, useContext, useState, useEffect } from 'react';
import { swanService, SwanAccount, SwanTransaction } from '../services/swanService';
import { useAuth } from './AuthContext';

interface SwanContextType {
  accounts: SwanAccount[];
  transactions: SwanTransaction[];
  novxBalance: number;
  loading: boolean;
  error: string | null;
  refreshAccounts: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  initiatePayment: (recipient: string, amount: number, reference: string) => Promise<void>;
}

const SwanContext = createContext<SwanContextType | undefined>(undefined);

export function SwanProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<SwanAccount[]>([]);
  const [transactions, setTransactions] = useState<SwanTransaction[]>([]);
  const [novxBalance, setNovxBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAccounts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      // Get all accounts for the user
      const accountsList = await Promise.all(
        accounts.map(account => swanService.getAccountDetails(account.id))
      );
      
      setAccounts(accountsList);

      // Calculate total NOVX balance
      const totalEurBalance = accountsList.reduce((sum, account) => sum + account.balance, 0);
      setNovxBalance(swanService.convertToNovx(totalEurBalance));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refreshTransactions = async () => {
    if (!user || accounts.length === 0) return;
    
    try {
      setLoading(true);
      setError(null);

      // Get transactions for all accounts
      const allTransactions = await Promise.all(
        accounts.map(account => swanService.getTransactions(account.id))
      );
      
      setTransactions(allTransactions.flat());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async (recipient: string, amount: number, reference: string) => {
    if (!user || accounts.length === 0) return;
    
    try {
      setLoading(true);
      setError(null);

      // Use the first account for payments (you might want to add account selection)
      await swanService.initiatePayment(accounts[0].id, recipient, amount, reference);
      
      // Refresh accounts and transactions after payment
      await refreshAccounts();
      await refreshTransactions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshAccounts();
    }
  }, [user]);

  const value = {
    accounts,
    transactions,
    novxBalance,
    loading,
    error,
    refreshAccounts,
    refreshTransactions,
    initiatePayment,
  };

  return (
    <SwanContext.Provider value={value}>
      {children}
    </SwanContext.Provider>
  );
}

export function useSwan() {
  const context = useContext(SwanContext);
  if (context === undefined) {
    throw new Error('useSwan must be used within a SwanProvider');
  }
  return context;
}