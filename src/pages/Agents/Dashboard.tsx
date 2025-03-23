import React from 'react';
import { ModuleKPIs } from '../../components/ModuleKPIs';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { HomeIcon, Users2, Euro, TrendingUp, Target, Calendar } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', ventes: 180000, commissions: 9000 },
  { month: 'Fév', ventes: 250000, commissions: 12500 },
  { month: 'Mar', ventes: 320000, commissions: 16000 },
  { month: 'Avr', ventes: 280000, commissions: 14000 },
  { month: 'Mai', ventes: 420000, commissions: 21000 },
  { month: 'Juin', ventes: 380000, commissions: 19000 }
];

const prospectionData = [
  { type: 'Appels', objectif: 50, realise: 45 },
  { type: 'RDV', objectif: 20, realise: 18 },
  { type: 'Visites', objectif: 15, realise: 12 },
  { type: 'Mandats', objectif: 5, realise: 4 },
  { type: 'Offres', objectif: 8, realise: 6 },
  { type: 'Ventes', objectif: 3, realise: 2 }
];

const mandatsData = [
  { name: 'Exclusifs', value: 60 },
  { name: 'Simples', value: 30 },
  { name: 'Semi-exclusifs', value: 10 }
];

const COLORS = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981'];

export function AgentsDashboard() {
  return (
    <div className="space-y-6">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 text-transparent bg-clip-text">
          Tableau de bord Agents Immobiliers
        </h1>
        <p className="text-gray-400 mt-1">Vue d'ensemble de votre activité commerciale</p>
      </div>

      <ModuleKPIs module="agents" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
        {/* Évolution des ventes et commissions */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <Euro className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-semibold text-rose-400">Évolution des ventes et commissions</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCommissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
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
                  formatter={(value) => new Intl.NumberFormat('fr-FR', { 
                    style: 'currency', 
                    currency: 'EUR',
                    maximumFractionDigits: 0
                  }).format(value)}
                />
                <Area
                  type="monotone"
                  dataKey="ventes"
                  stroke="#EC4899"
                  fillOpacity={1}
                  fill="url(#colorVentes)"
                  name="Ventes"
                />
                <Area
                  type="monotone"
                  dataKey="commissions"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorCommissions)"
                  name="Commissions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Objectifs de prospection */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-semibold text-rose-400">Objectifs de prospection</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prospectionData}>
                <XAxis dataKey="type" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="objectif" fill="#6B7280" name="Objectif" />
                <Bar dataKey="realise" fill="#EC4899" name="Réalisé" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition des mandats */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <HomeIcon className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-semibold text-rose-400">Répartition des mandats</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mandatsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mandatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activités de la semaine */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-semibold text-rose-400">Activités de la semaine</h3>
          </div>
          <div className="space-y-4">
            {[
              { type: 'Visites programmées', count: 8, date: '2024-03-18', status: 'à venir' },
              { type: 'Estimation', count: 2, date: '2024-03-19', status: 'confirmé' },
              { type: 'Signature mandat', count: 1, date: '2024-03-20', status: 'urgent' },
              { type: 'Rendez-vous client', count: 4, date: '2024-03-21', status: 'à confirmer' }
            ].map((activity) => (
              <div
                key={activity.type}
                className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30"
              >
                <div>
                  <h4 className="text-gray-200">{activity.type}</h4>
                  <p className="text-sm text-gray-400">
                    {new Date(activity.date).toLocaleDateString('fr-FR')} - {activity.count} {activity.count > 1 ? 'rendez-vous' : 'rendez-vous'}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs ${
                  activity.status === 'à venir'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : activity.status === 'confirmé'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : activity.status === 'urgent'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}