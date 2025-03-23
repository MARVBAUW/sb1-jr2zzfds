import React, { createContext, useContext, useState, useEffect } from 'react';
import { stripeService, BankAccount, Transaction } from '../services/stripeService';
import { useAuth } from './AuthContext';

interface FinanceContextType {
  accounts: BankAccount[];
  transactions: Transaction[];
  novxBalance: number;
  loading: boolean;
  error: string | null;
  refreshAccounts: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  initiatePayment: (params: {
    amount: number;
    currency: string;
    destination: string;
    description: string;
  }) => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [novxBalance, setNovxBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAccounts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      const accountsList = await stripeService.getBankAccounts();
      setAccounts(accountsList);

      // Calculate total NOVX balance
      const totalBalance = accountsList.reduce((sum, account) => sum + account.balance, 0);
      setNovxBalance(stripeService.convertToNovx(totalBalance));
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

      const allTransactions = await Promise.all(
        accounts.map(account => stripeService.getTransactions(account.id))
      );
      
      setTransactions(allTransactions.flat());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async (params: {
    amount: number;
    currency: string;
    destination: string;
    description: string;
  }) => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      await stripeService.initiatePayment(params);
      
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
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}