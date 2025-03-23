import React from 'react';
import { Search, Filter, Plus, CreditCard, Building2, ArrowUpRight, ArrowDownRight, ExternalLink, MoreVertical, Coins } from 'lucide-react';

const mockAccounts = [
  {
    id: '1',
    name: 'Compte principal',
    bank: 'BNP Paribas',
    accountNumber: 'FR76 XXXX XXXX XXXX 1234',
    balance: 125000,
    novxBalance: 2500,
    lastSync: '2024-03-16T10:30:00',
    type: 'current',
    recentTransactions: [
      { id: '1', description: 'Paiement client Dupont', amount: 12500, type: 'credit', date: '2024-03-15' },
      { id: '2', description: 'Facture fournisseur', amount: -3500, type: 'debit', date: '2024-03-14' }
    ]
  },
  {
    id: '2',
    name: 'Compte épargne',
    bank: 'Société Générale',
    accountNumber: 'FR76 XXXX XXXX XXXX 5678',
    balance: 45000,
    novxBalance: 900,
    lastSync: '2024-03-16T10:30:00',
    type: 'savings',
    recentTransactions: [
      { id: '3', description: 'Virement interne', amount: 5000, type: 'credit', date: '2024-03-13' }
    ]
  },
  {
    id: '3',
    name: 'Compte professionnel',
    bank: 'Crédit Agricole',
    accountNumber: 'FR76 XXXX XXXX XXXX 9012',
    balance: 78000,
    novxBalance: 1600,
    lastSync: '2024-03-16T10:30:00',
    type: 'professional',
    recentTransactions: [
      { id: '4', description: 'Paiement client Martin', amount: 8900, type: 'credit', date: '2024-03-15' },
      { id: '5', description: 'Charges sociales', amount: -4500, type: 'debit', date: '2024-03-12' }
    ]
  }
];

export function BankAccounts() {
  const totalNovxBalance = mockAccounts.reduce((sum, account) => sum + account.novxBalance, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Comptes bancaires
          </h1>
          <p className="text-gray-400 mt-1">Gestion des comptes et suivi des soldes</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-panel px-4 py-2 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-sm text-gray-400">Balance NOVX</p>
              <p className="text-lg font-medium text-amber-400">{totalNovxBalance} NOVX</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un compte..."
              className="pl-10 pr-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 
                focus:ring-1 focus:ring-cyan-500/50 w-64"
            />
          </div>
          <button className="p-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
            hover:bg-dark-600/50 hover:border-cyan-500/50 transition-all duration-200">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Ajouter un compte</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockAccounts.map((account) => (
          <div key={account.id} className="glass-panel p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {account.type === 'current' ? (
                  <CreditCard className="w-8 h-8 text-cyan-400" />
                ) : account.type === 'savings' ? (
                  <Building2 className="w-8 h-8 text-emerald-400" />
                ) : (
                  <Building2 className="w-8 h-8 text-purple-400" />
                )}
                <div>
                  <h3 className="font-medium text-gray-200">{account.name}</h3>
                  <p className="text-sm text-gray-400">{account.bank}</p>
                </div>
              </div>
              <button className="p-1 rounded-lg hover:bg-dark-600/50 transition-colors duration-200">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Solde EUR</p>
                  <p className="text-2xl font-light text-cyan-400">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(account.balance)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Solde NOVX</p>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <p className="text-2xl font-light text-amber-400">
                      {account.novxBalance}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Dernières opérations</p>
                <div className="space-y-2">
                  {account.recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-dark-700/30"
                    >
                      <div className="min-w-0">
                        <p className="text-sm text-gray-300 truncate">{transaction.description}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(transaction.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {transaction.type === 'credit' ? (
                          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-rose-400" />
                        )}
                        <span className={`text-sm ${
                          transaction.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(transaction.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Dernière synchro : {new Date(account.lastSync).toLocaleTimeString('fr-FR')}
                  </span>
                  <button className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                    <span>Détails</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}