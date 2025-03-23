import React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { KPI } from '../types';

interface StatsProps {
  stats: KPI[];
}

const monthlyData = [
  { name: 'Jan', value: 1200000 },
  { name: 'Fév', value: 1350000 },
  { name: 'Mar', value: 1500000 },
  { name: 'Avr', value: 1800000 },
  { name: 'Mai', value: 2100000 },
  { name: 'Juin', value: 2500000 },
];

const projectTypes = [
  { name: 'Résidentiel', value: 45 },
  { name: 'Commercial', value: 25 },
  { name: 'Industriel', value: 15 },
  { name: 'Public', value: 15 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

const performanceData = [
  { month: 'Jan', actual: 85, target: 80 },
  { month: 'Fév', actual: 88, target: 82 },
  { month: 'Mar', actual: 92, target: 85 },
  { month: 'Avr', actual: 90, target: 87 },
  { month: 'Mai', actual: 95, target: 90 },
  { month: 'Juin', actual: 98, target: 92 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-700/90 border border-emerald-500/20 rounded-lg p-3">
        <p className="text-emerald-400">{`${label} : ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

export function DashboardStats({ stats }: StatsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-panel relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6"
          >
            <dt>
              <p className="truncate text-sm font-medium text-gray-400 tracking-wide">{stat.label}</p>
            </dt>
            <dd className="mt-2">
              <p className="text-2xl font-light text-cyan-400 tracking-tight">
                {typeof stat.value === 'number' && stat.label.includes('€')
                  ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stat.value)
                  : stat.value}
                {stat.label.includes('%') ? '%' : ''}
              </p>
              <p className={`flex items-center text-sm mt-1 font-medium tracking-wide ${
                stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stat.trend === 'up' ? '↑' : '↓'} {stat.change}%
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Evolution */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-emerald-400 mb-6">Évolution du budget géré</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis 
                  stroke="#6B7280"
                  tickFormatter={(value) => `${value / 1000000}M€`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Types Distribution */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-emerald-400 mb-6">Répartition des projets</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {projectTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-emerald-400 mb-6">Performance vs Objectifs</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                  name="Réalisé"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#6B7280" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ fill: '#6B7280' }}
                  name="Objectif"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-emerald-400 mb-6">Progression mensuelle</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis 
                  stroke="#6B7280"
                  tickFormatter={(value) => `${value / 1000000}M€`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}