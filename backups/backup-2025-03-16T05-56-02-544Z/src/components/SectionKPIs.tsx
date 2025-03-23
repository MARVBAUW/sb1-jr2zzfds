import React from 'react';
import { DashboardStats } from './DashboardStats';
import type { KPI } from '../types';

interface SectionKPIProps {
  section: string;
}

export function SectionKPIs({ section }: SectionKPIProps) {
  const getKPIsForSection = (section: string): KPI[] => {
    switch (section) {
      case 'gestion-projets':
        return [
          { label: 'Projets en cours', value: 15, change: 20, trend: 'up' },
          { label: 'En phase travaux', value: 8, change: 14, trend: 'up' },
          { label: 'En phase études', value: 7, change: 27, trend: 'up' },
          { label: 'Appels d\'offres', value: 4, change: 33, trend: 'up' },
          { label: 'Factures en attente', value: 12, change: 8, trend: 'down' },
          { label: 'Décomptes à valider', value: 6, change: 20, trend: 'up' }
        ];
      case 'analyses':
        return [
          { label: 'Performance budgétaire', value: 92, change: 5, trend: 'up' },
          { label: 'Taux de rentabilité', value: 24, change: 12, trend: 'up' },
          { label: 'Délais respectés', value: 88, change: 3, trend: 'down' },
          { label: 'Optimisations IA', value: 15, change: 40, trend: 'up' }
        ];
      case 'outils':
        return [
          { label: 'Documents générés', value: 145, change: 25, trend: 'up' },
          { label: 'Études RE2020', value: 8, change: 60, trend: 'up' },
          { label: 'Calculs techniques', value: 34, change: 15, trend: 'up' },
          { label: 'Normes mises à jour', value: 12, change: 9, trend: 'up' }
        ];
      case 'chantier':
        return [
          { label: 'Chantiers actifs', value: 8, change: 14, trend: 'up' },
          { label: 'Taux d\'avancement', value: 65, change: 12, trend: 'up' },
          { label: 'Plans mis à jour', value: 23, change: 28, trend: 'up' },
          { label: 'Réserves levées', value: 45, change: 30, trend: 'up' }
        ];
      default:
        return [];
    }
  };

  const kpis = getKPIsForSection(section);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="glass-panel p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">{kpi.label}</h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-light text-emerald-400">
                {typeof kpi.value === 'number' && kpi.label.includes('€')
                  ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(kpi.value)
                  : kpi.value + (kpi.label.includes('%') ? '%' : '')}
              </p>
              <div className={`flex items-center text-sm ${
                kpi.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}