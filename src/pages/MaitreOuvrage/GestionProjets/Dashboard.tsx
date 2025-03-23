import React from 'react';
import { DashboardStats } from '../../../components/DashboardStats';

const mockStats = [
  { label: 'Projets actifs', value: 12, change: 20, trend: 'up' },
  { label: 'Budget total', value: 2500000, change: 15, trend: 'up' },
  { label: 'ROI moyen', value: 18.5, change: 2.5, trend: 'up' },
  { label: 'Délais respectés', value: 92, change: 3, trend: 'up' }
];

export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text mb-4">
        Dashboard Projets
      </h1>
      <p className="text-gray-400 mb-6">
        Vue d'ensemble et suivi global des projets
      </p>
      
      <DashboardStats stats={mockStats} />
    </div>
  );
}