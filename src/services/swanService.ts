import { Swan } from '@swan-io/sdk';

// Initialize Swan SDK with your credentials
const swan = new Swan({
  clientId: process.env.SWAN_CLIENT_ID || '',
  clientSecret: process.env.SWAN_CLIENT_SECRET || '',
  environment: 'sandbox', // or 'production' for live environment
});

export interface SwanAccount {
  id: string;
  iban: string;
  bic: string;
  balance: number;
  currency: string;
  status: string;
}

export interface SwanTransaction {
  id: string;
  amount: number;
  currency: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  status: string;
}

class SwanService {
  // Initialize bank account
  async initializeBankAccount(userId: string) {
    try {
      const account = await swan.accounts.create({
        userId,
        currency: 'EUR',
        country: 'FR',
      });
      return account;
    } catch (error) {
      console.error('Error initializing bank account:', error);
      throw error;
    }
  }

  // Get account details
  async getAccountDetails(accountId: string): Promise<SwanAccount> {
    try {
      const account = await swan.accounts.get(accountId);
      return {
        id: account.id,
        iban: account.iban,
        bic: account.bic,
        balance: account.balance,
        currency: account.currency,
        status: account.status,
      };
    } catch (error) {
      console.error('Error getting account details:', error);
      throw error;
    }
  }

  // Get account transactions
  async getTransactions(accountId: string): Promise<SwanTransaction[]> {
    try {
      const transactions = await swan.transactions.list({
        accountId,
        limit: 50,
      });
      
      return transactions.items.map(transaction => ({
        id: transaction.id,
        amount: transaction.amount,
        currency: transaction.currency,
        date: transaction.executionDate,
        description: transaction.description || '',
        type: transaction.amount > 0 ? 'credit' : 'debit',
        status: transaction.status,
      }));
    } catch (error) {
      console.error('Error getting transactions:', error);
      throw error;
    }
  }

  // Initiate payment
  async initiatePayment(accountId: string, recipient: string, amount: number, reference: string) {
    try {
      const payment = await swan.payments.create({
        accountId,
        amount,
        currency: 'EUR',
        recipientIban: recipient,
        reference,
      });
      return payment;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw error;
    }
  }

  // Get account balance
  async getBalance(accountId: string) {
    try {
      const account = await this.getAccountDetails(accountId);
      return account.balance;
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  // Convert balance to NOVX
  convertToNovx(eurAmount: number): number {
    // Current conversion rate: 1 EUR = 1 NOVX
    return eurAmount;
  }
}

export const swanService = new SwanService();