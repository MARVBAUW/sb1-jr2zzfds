import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { DashboardStats } from '../../components/DashboardStats';
import { QuickActions } from '../../components/QuickActions';
import { 
  Building2, FileText, Calculator, ClipboardList, Calendar, 
  Receipt, MessageSquare, Wrench, BarChart2, DollarSign,
  PiggyBank, TrendingUp, FileSearch, Target, Briefcase
} from 'lucide-react';
import type { KPI } from '../../types';

const maitreOuvrageStats: KPI[] = [
  { label: 'Actifs gérés', value: 18, change: 12, trend: 'up' },
  { label: 'Valeur portfolio', value: 4500000, change: 15, trend: 'up' },
  { label: 'Rendement moyen', value: 6.8, change: 0.5, trend: 'up' },
  { label: 'Taux occupation', value: 95, change: 2, trend: 'up' }
];

function MaitreOuvrageDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
            Maître d'ouvrage
          </h1>
          <p className="text-gray-400 mt-1">Gestion de patrimoine et investissements</p>
        </div>
        <QuickActions />
      </div>

      <DashboardStats stats={maitreOuvrageStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-blue-400 mb-4">Actifs récents</h2>
          <div className="space-y-4">
            {['Immeuble Haussmann', 'Centre Commercial Nord', 'Résidence Le Parc'].map((asset) => (
              <div key={asset} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{asset}</span>
                <span className="text-blue-400/70 text-sm">Actif</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-blue-400 mb-4">Échéances importantes</h2>
          <div className="space-y-4">
            {[
              'Renouvellement bail commercial',
              'Assemblée générale copropriété',
              'Révision loyers indexés'
            ].map((task) => (
              <div key={task} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{task}</span>
                <span className="text-amber-400/70 text-sm">À venir</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const subModules = [
    {
      name: 'Gestion Patrimoniale',
      icon: Building2,
      subItems: [
        {
          name: 'Portefeuille',
          href: '/maitre-ouvrage/patrimoine/portefeuille',
          icon: Briefcase,
          description: 'Vue d\'ensemble des actifs'
        },
        {
          name: 'Analyse Financière',
          href: '/maitre-ouvrage/patrimoine/finance',
          icon: DollarSign,
          description: 'Performance et rentabilité'
        },
        {
          name: 'Gestion Locative',
          href: '/maitre-ouvrage/patrimoine/locatif',
          icon: Building2,
          description: 'Suivi des locations'
        }
      ]
    },
    {
      name: 'Investissements',
      icon: TrendingUp,
      subItems: [
        {
          name: 'Opportunités',
          href: '/maitre-ouvrage/investissements/opportunites',
          icon: Target,
          description: 'Recherche d\'opportunités'
        },
        {
          name: 'Due Diligence',
          href: '/maitre-ouvrage/investissements/due-diligence',
          icon: FileSearch,
          description: 'Analyse des risques'
        },
        {
          name: 'Performance',
          href: '/maitre-ouvrage/investissements/performance',
          icon: PiggyBank,
          description: 'Suivi des performances'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Submenu Sidebar */}
      <div className="w-64 fixed left-16 top-0 h-screen bg-dark-800/95 backdrop-blur-xl 
        border-r border-gray-700/50 flex flex-col">
        <div className="h-16 border-b border-gray-700/50 flex items-center px-4">
          <h2 className="text-sm font-medium text-blue-400">
            Maître d'ouvrage
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {subModules.map((module) => (
            <div key={module.name} className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-blue-400">
                {module.name}
              </div>
              {module.subItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-dark-700/50'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 text-blue-400" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">
                      {item.description}
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80">
        {children}
      </div>
    </div>
  );
}

export function MaitreOuvrage() {
  return (
    <ModuleLayout>
      <Routes>
        <Route index element={<MaitreOuvrageDashboard />} />
        
        {/* Gestion Patrimoniale */}
        <Route path="patrimoine" element={<div>Gestion Patrimoniale</div>} />
        <Route path="patrimoine/portefeuille" element={<div>Portefeuille</div>} />
        <Route path="patrimoine/finance" element={<div>Analyse Financière</div>} />
        <Route path="patrimoine/locatif" element={<div>Gestion Locative</div>} />
        
        {/* Investissements */}
        <Route path="investissements" element={<div>Investissements</div>} />
        <Route path="investissements/opportunites" element={<div>Opportunités</div>} />
        <Route path="investissements/due-diligence" element={<div>Due Diligence</div>} />
        <Route path="investissements/performance" element={<div>Performance</div>} />
        
        {/* Fallback */}
        <Route path="*" element={<MaitreOuvrageDashboard />} />
      </Routes>
    </ModuleLayout>
  );
}