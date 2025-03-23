import React from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Euro, TrendingUp, TrendingDown, AlertTriangle, Bell, ArrowUpRight, ArrowDownRight, Wallet, Receipt, Building2, FileText } from 'lucide-react';

const mockData = {
  cashFlow: [
    { month: 'Jan', income: 45000, expenses: 32000 },
    { month: 'Fév', income: 52000, expenses: 38000 },
    { month: 'Mar', income: 48000, expenses: 35000 },
    { month: 'Avr', income: 61000, expenses: 42000 },
    { month: 'Mai', income: 55000, expenses: 39000 },
    { month: 'Juin', income: 67000, expenses: 45000 }
  ],
  budgetComparison: [
    { category: 'Travaux', budget: 30000, actual: 28500 },
    { category: 'Matériel', budget: 15000, actual: 16200 },
    { category: 'S-traitance', budget: 25000, actual: 23800 },
    { category: 'Personnel', budget: 20000, actual: 19500 }
  ],
  alerts: [
    { id: 1, type: 'warning', message: 'Facture #F2024-123 en retard de paiement (15 jours)', amount: 3500 },
    { id: 2, type: 'info', message: 'Rapprochement bancaire à effectuer', date: '2024-03-20' },
    { id: 3, type: 'danger', message: 'Seuil de trésorerie bas atteint', amount: 4800 }
  ],
  quickStats: [
    { label: 'Trésorerie', value: 125000, trend: 'up', change: 12 },
    { label: 'À encaisser', value: 45000, trend: 'up', change: 8 },
    { label: 'À payer', value: 32000, trend: 'down', change: 5 },
    { label: 'Résultat mensuel', value: 22000, trend: 'up', change: 15 }
  ]
};

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Tableau de bord financier
          </h1>
          <p className="text-gray-400 mt-1">Vue d'ensemble de votre situation financière</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="btn-secondary flex items-center gap-2 opacity-50 cursor-not-allowed"
            disabled
            title="Fonctionnalité en développement"
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button 
            className="btn-primary flex items-center gap-2 opacity-50 cursor-not-allowed"
            disabled
            title="Fonctionnalité en développement"
          >
            <FileText className="w-4 h-4" />
            <span>Nouveau rapport</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.quickStats.map((stat, index) => (
          <div key={index} className="glass-panel p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-light text-cyan-400 mt-1">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stat.value)}
                </p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-6">Évolution de la trésorerie</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData.cashFlow}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#0EA5E9"
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                  name="Revenus"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#F43F5E"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                  name="Dépenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-6">Budget vs. Réel</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.budgetComparison}>
                <XAxis dataKey="category" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="budget" fill="#0EA5E9" name="Budget" />
                <Bar dataKey="actual" fill="#F43F5E" name="Réel" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Alertes & Notifications</h3>
          <div className="space-y-4">
            {mockData.alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.type === 'warning' ? 'border-amber-500/20 bg-amber-500/10' :
                  alert.type === 'danger' ? 'border-rose-500/20 bg-rose-500/10' :
                  'border-cyan-500/20 bg-cyan-500/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  ) : alert.type === 'danger' ? (
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  ) : (
                    <Bell className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm ${
                      alert.type === 'warning' ? 'text-amber-400' :
                      alert.type === 'danger' ? 'text-rose-400' :
                      'text-cyan-400'
                    }`}>
                      {alert.message}
                    </p>
                    {alert.amount && (
                      <p className="text-sm text-gray-400 mt-1">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(alert.amount)}
                      </p>
                    )}
                    {alert.date && (
                      <p className="text-sm text-gray-400 mt-1">
                        Échéance : {new Date(alert.date).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Wallet, label: 'Transactions', path: '/comptabilite/transactions' },
              { icon: Receipt, label: 'Factures', path: '/comptabilite/factures' },
              { icon: Building2, label: 'Comptes', path: '/comptabilite/comptes' },
              { icon: FileText, label: 'Rapports', path: '/comptabilite/rapports' }
            ].map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="p-4 rounded-lg bg-dark-700/30 border border-dark-400/20 
                  opacity-50 cursor-not-allowed pointer-events-none"
                title="Fonctionnalité en développement"
              >
                <action.icon className="w-6 h-6 text-cyan-400 mb-2" />
                <p className="text-sm text-cyan-400">{action.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}