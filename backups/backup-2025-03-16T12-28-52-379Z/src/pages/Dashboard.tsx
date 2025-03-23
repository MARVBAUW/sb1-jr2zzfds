import React from 'react';
import { DashboardStats } from '../components/DashboardStats';
import type { KPI } from '../types';

const mockStats: KPI[] = [
  { label: 'Projets Actifs', value: 12, change: 8, trend: 'up' },
  { label: 'Budget Total', value: 2500000, change: 12, trend: 'up' },
  { label: 'ROI Moyen', value: 15, change: 2, trend: 'down' },
  { label: 'Crédits Carbone', value: 45, change: 5, trend: 'up' }
];

export function Dashboard() {
  return (
    <div className="p-6 aurora-bg">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-6">
        Tableau de Bord
      </h1>
      <DashboardStats stats={mockStats} />
    </div>
  );
}