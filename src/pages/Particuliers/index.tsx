import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { DashboardStats } from '../../components/DashboardStats';
import { QuickActions } from '../../components/QuickActions';
import { 
  Building2, FileText, Calculator, DollarSign, 
  PiggyBank, Key, Users2, Wrench, Calendar
} from 'lucide-react';
import type { KPI } from '../../types';

const particuliersStats: KPI[] = [
  { label: 'Biens', value: 3, change: 50, trend: 'up' },
  { label: 'Valeur totale', value: 750000, change: 15, trend: 'up' },
  { label: 'Revenus locatifs', value: 2800, change: 12, trend: 'up' },
  { label: 'Rendement', value: 4.8, change: 0.3, trend: 'up' }
];

function ParticuliersDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
            Particuliers
          </h1>
          <p className="text-gray-400 mt-1">Gestion de patrimoine et location</p>
        </div>
        <QuickActions />
      </div>

      <DashboardStats stats={particuliersStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-amber-400 mb-4">Biens récents</h2>
          <div className="space-y-4">
            {['Appartement Paris 15e', 'Studio Bordeaux', 'Maison Nantes'].map((bien) => (
              <div key={bien} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{bien}</span>
                <span className="text-amber-400/70 text-sm">Actif</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-amber-400 mb-4">Échéances</h2>
          <div className="space-y-4">
            {[
              'Paiement loyer Appartement Paris',
              'Révision chaudière Studio',
              'Renouvellement bail Maison'
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
      name: 'Patrimoine',
      icon: Building2,
      subItems: [
        {
          name: 'Biens',
          href: '/particuliers/patrimoine/biens',
          icon: Building2,
          description: 'Liste des biens'
        },
        {
          name: 'Finances',
          href: '/particuliers/patrimoine/finances',
          icon: DollarSign,
          description: 'Suivi financier'
        },
        {
          name: 'Épargne',
          href: '/particuliers/patrimoine/epargne',
          icon: PiggyBank,
          description: 'Gestion de l\'épargne'
        }
      ]
    },
    {
      name: 'Location',
      icon: Key,
      subItems: [
        {
          name: 'Locataires',
          href: '/particuliers/location/locataires',
          icon: Users2,
          description: 'Gestion des locataires'
        },
        {
          name: 'Loyers',
          href: '/particuliers/location/loyers',
          icon: DollarSign,
          description: 'Suivi des loyers'
        },
        {
          name: 'Entretien',
          href: '/particuliers/location/entretien',
          icon: Wrench,
          description: 'Maintenance et réparations'
        }
      ]
    },
    {
      name: 'Documents',
      icon: FileText,
      subItems: [
        {
          name: 'Contrats',
          href: '/particuliers/documents/contrats',
          icon: FileText,
          description: 'Gestion des contrats'
        },
        {
          name: 'Factures',
          href: '/particuliers/documents/factures',
          icon: Calculator,
          description: 'Suivi des factures'
        },
        {
          name: 'Planning',
          href: '/particuliers/documents/planning',
          icon: Calendar,
          description: 'Calendrier des échéances'
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
          <h2 className="text-sm font-medium text-amber-400">
            Particuliers
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {subModules.map((module) => (
            <div key={module.name} className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-amber-400">
                {module.name}
              </div>
              {module.subItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-dark-700/50'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 text-amber-400" />
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

export function Particuliers() {
  return (
    <ModuleLayout>
      <Routes>
        <Route index element={<ParticuliersDashboard />} />
        
        {/* Patrimoine */}
        <Route path="patrimoine" element={<div>Patrimoine</div>} />
        <Route path="patrimoine/biens" element={<div>Biens</div>} />
        <Route path="patrimoine/finances" element={<div>Finances</div>} />
        <Route path="patrimoine/epargne" element={<div>Épargne</div>} />
        
        {/* Location */}
        <Route path="location" element={<div>Location</div>} />
        <Route path="location/locataires" element={<div>Locataires</div>} />
        <Route path="location/loyers" element={<div>Loyers</div>} />
        <Route path="location/entretien" element={<div>Entretien</div>} />
        
        {/* Documents */}
        <Route path="documents" element={<div>Documents</div>} />
        <Route path="documents/contrats" element={<div>Contrats</div>} />
        <Route path="documents/factures" element={<div>Factures</div>} />
        <Route path="documents/planning" element={<div>Planning</div>} />
        
        {/* Fallback */}
        <Route path="*" element={<ParticuliersDashboard />} />
      </Routes>
    </ModuleLayout>
  );
}