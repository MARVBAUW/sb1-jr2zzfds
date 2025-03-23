import React from 'react';
import { ModuleKPIs } from '../../components/ModuleKPIs';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Home, Wallet, Wrench, FileText, TrendingUp } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', loyers: 2800, charges: 400 },
  { month: 'Fév', loyers: 2800, charges: 420 },
  { month: 'Mar', loyers: 2800, charges: 380 },
  { month: 'Avr', loyers: 3200, charges: 450 },
  { month: 'Mai', loyers: 3200, charges: 430 },
  { month: 'Juin', loyers: 3200, charges: 440 }
];

const travauxData = [
  { phase: 'Préparation', prevu: 100, realise: 100 },
  { phase: 'Démolition', prevu: 100, realise: 100 },
  { phase: 'Gros œuvre', prevu: 100, realise: 85 },
  { phase: 'Second œuvre', prevu: 100, realise: 60 },
  { phase: 'Finitions', prevu: 100, realise: 20 },
  { phase: 'Réception', prevu: 100, realise: 0 }
];

const repartitionBudget = [
  { name: 'Gros œuvre', value: 40 },
  { name: 'Second œuvre', value: 35 },
  { name: 'Finitions', value: 15 },
  { name: 'Autres', value: 10 }
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

export function ParticuliersDashboard() {
  return (
    <div className="space-y-6">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
          Tableau de bord Particuliers
        </h1>
        <p className="text-gray-400 mt-1">Vue d'ensemble de votre patrimoine et des travaux en cours</p>
      </div>

      <ModuleKPIs module="particuliers" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
        {/* Évolution des loyers et charges */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">Évolution des loyers et charges</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorLoyers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCharges" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
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
                  dataKey="loyers"
                  stroke="#F59E0B"
                  fillOpacity={1}
                  fill="url(#colorLoyers)"
                  name="Loyers"
                />
                <Area
                  type="monotone"
                  dataKey="charges"
                  stroke="#EF4444"
                  fillOpacity={1}
                  fill="url(#colorCharges)"
                  name="Charges"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avancement des travaux */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">Avancement des travaux</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={travauxData}>
                <XAxis dataKey="phase" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="prevu" fill="#6B7280" name="Prévu" />
                <Bar dataKey="realise" fill="#F59E0B" name="Réalisé" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition du budget */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">Répartition du budget</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={repartitionBudget}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {repartitionBudget.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Documents et échéances */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">Documents et échéances</h3>
          </div>
          <div className="space-y-4">
            {[
              { type: 'Assurance', date: '2024-04-15', status: 'à jour' },
              { type: 'Diagnostic', date: '2024-05-01', status: 'à renouveler' },
              { type: 'Bail', date: '2024-08-30', status: 'à jour' },
              { type: 'Impôts', date: '2024-05-31', status: 'en attente' }
            ].map((doc) => (
              <div
                key={doc.type}
                className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30"
              >
                <div>
                  <h4 className="text-gray-200">{doc.type}</h4>
                  <p className="text-sm text-gray-400">
                    Échéance : {new Date(doc.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs ${
                  doc.status === 'à jour'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : doc.status === 'à renouveler'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}