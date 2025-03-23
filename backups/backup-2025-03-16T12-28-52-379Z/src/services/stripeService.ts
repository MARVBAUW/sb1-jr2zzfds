import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export interface BankAccount {
  id: string;
  bank_name: string;
  last4: string;
  balance: number;
  currency: string;
  status: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  status: string;
}

class StripeService {
  private async getStripe() {
    return await stripePromise;
  }

  // Initialize bank account connection
  async connectBankAccount() {
    try {
      const stripe = await this.getStripe();
      if (!stripe) throw new Error('Stripe not initialized');

      const { data } = await axios.post('/api/stripe/connect-bank');
      return data.accountLinkUrl;
    } catch (error) {
      console.error('Error connecting bank account:', error);
      throw error;
    }
  }

  // Get account details
  async getBankAccounts(): Promise<BankAccount[]> {
    try {
      const { data } = await axios.get('/api/stripe/bank-accounts');
      return data.accounts;
    } catch (error) {
      console.error('Error getting bank accounts:', error);
      throw error;
    }
  }

  // Get account transactions
  async getTransactions(accountId: string): Promise<Transaction[]> {
    try {
      const { data } = await axios.get(`/api/stripe/transactions/${accountId}`);
      return data.transactions;
    } catch (error) {
      console.error('Error getting transactions:', error);
      throw error;
    }
  }

  // Initiate payment
  async initiatePayment(params: {
    amount: number;
    currency: string;
    destination: string;
    description: string;
  }) {
    try {
      const { data } = await axios.post('/api/stripe/payments', params);
      return data.payment;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw error;
    }
  }

  // Get balance
  async getBalance(accountId: string): Promise<number> {
    try {
      const { data } = await axios.get(`/api/stripe/balance/${accountId}`);
      return data.balance;
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  // Convert balance to NOVX
  convertToNovx(amount: number): number {
    // Current conversion rate: 1 EUR = 1 NOVX
    return amount;
  }
}

export const stripeService = new StripeService();