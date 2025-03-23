import React from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const mockTransactions = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Paiement facture #F2024-123',
    type: 'debit',
    amount: 3500,
    category: 'Fournisseurs',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-03-14',
    description: 'Règlement client Dupont',
    type: 'credit',
    amount: 12500,
    category: 'Clients',
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-03-13',
    description: 'Achat matériel',
    type: 'debit',
    amount: 2800,
    category: 'Équipement',
    status: 'pending'
  }
];

export function Transactions() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Transactions
          </h1>
          <p className="text-gray-400 mt-1">Suivi des mouvements financiers</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une transaction..."
              className="pl-10 pr-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 
                focus:ring-1 focus:ring-cyan-500/50 w-64"
            />
          </div>
          <button className="p-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
            hover:bg-dark-600/50 hover:border-cyan-500/50 transition-all duration-200">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Description</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Catégorie</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Montant</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-dark-700/30 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(transaction.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{transaction.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 
                      border border-cyan-500/20">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-rose-400" />
                      )}
                      <span className={transaction.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'}>
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(transaction.amount)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs ${
                      transaction.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {transaction.status === 'completed' ? 'Effectué' : 'En attente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}