import React from 'react';
import { Search, Filter, FileText, Download } from 'lucide-react';

const mockInvoices = [
  {
    id: 'F2024-123',
    date: '2024-03-15',
    client: 'Entreprise Dupont',
    amount: 12500,
    status: 'paid',
    dueDate: '2024-04-15'
  },
  {
    id: 'F2024-124',
    date: '2024-03-14',
    client: 'SCI Martin',
    amount: 8900,
    status: 'pending',
    dueDate: '2024-04-14'
  },
  {
    id: 'F2024-125',
    date: '2024-03-13',
    client: 'SARL Construction Plus',
    amount: 15600,
    status: 'overdue',
    dueDate: '2024-03-28'
  }
];

export function Invoices() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Factures
          </h1>
          <p className="text-gray-400 mt-1">Gestion des factures clients et fournisseurs</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une facture..."
              className="pl-10 pr-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 
                focus:ring-1 focus:ring-cyan-500/50 w-64"
            />
          </div>
          <button className="p-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
            hover:bg-dark-600/50 hover:border-cyan-500/50 transition-all duration-200">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
          <button className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 
            border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-200
            flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Nouvelle facture
          </button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">N° Facture</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Client</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Montant</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Échéance</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Statut</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-dark-700/30 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(invoice.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{invoice.client}</td>
                  <td className="px-6 py-4 text-right text-sm text-cyan-400">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs ${
                      invoice.status === 'paid'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : invoice.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {invoice.status === 'paid' ? 'Payée' :
                       invoice.status === 'pending' ? 'En attente' :
                       'En retard'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-dark-600/50 text-gray-400 
                        hover:text-cyan-400 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-dark-600/50 text-gray-400 
                        hover:text-cyan-400 transition-colors duration-200">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-dark-700/30 rounded-lg border border-gray-700/50">
        <div className="text-sm text-gray-400">
          Affichage de <span className="text-cyan-400">1-3</span> sur <span className="text-cyan-400">3</span> factures
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-lg bg-dark-600/50 text-gray-400 
            hover:text-cyan-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Précédent
          </button>
          <button className="px-3 py-1 rounded-lg bg-dark-600/50 text-gray-400 
            hover:text-cyan-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}