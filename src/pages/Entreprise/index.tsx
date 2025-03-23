import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { DashboardStats } from '../../components/DashboardStats';
import { QuickActions } from '../../components/QuickActions';
import { 
  Factory, Truck, Package, ShoppingBag, Users2, FileText, Calculator, 
  Settings, Box, Warehouse, TrendingUp, ClipboardList, PenTool
} from 'lucide-react';
import type { KPI } from '../../types';

const entrepriseStats: KPI[] = [
  { label: 'Commandes', value: 45, change: 20, trend: 'up' },
  { label: 'CA mensuel', value: 180000, change: 15, trend: 'up' },
  { label: 'Marge brute', value: 22.5, change: 1.2, trend: 'up' },
  { label: 'Stock', value: 85000, change: 5, trend: 'down' }
];

function EntrepriseDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 text-transparent bg-clip-text">
            Entreprise & Fournisseurs
          </h1>
          <p className="text-gray-400 mt-1">Gestion de la chaîne d'approvisionnement et production</p>
        </div>
        <QuickActions />
      </div>

      <DashboardStats stats={entrepriseStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-purple-400 mb-4">Commandes récentes</h2>
          <div className="space-y-4">
            {['Commande #2024-123', 'Commande #2024-122', 'Commande #2024-121'].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{order}</span>
                <span className="text-purple-400/70 text-sm">En cours</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-purple-400 mb-4">Alertes stock</h2>
          <div className="space-y-4">
            {[
              'Stock minimum atteint - Ref A123',
              'Réapprovisionnement nécessaire - Ref B456',
              'Commande fournisseur à valider'
            ].map((alert) => (
              <div key={alert} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{alert}</span>
                <span className="text-amber-400/70 text-sm">Urgent</span>
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
      name: 'Supply Chain',
      icon: Truck,
      subItems: [
        {
          name: 'Commandes',
          href: '/entreprise/supply-chain/commandes',
          icon: Package,
          description: 'Gestion des commandes'
        },
        {
          name: 'Stock',
          href: '/entreprise/supply-chain/stock',
          icon: Box,
          description: 'Gestion des stocks'
        },
        {
          name: 'Fournisseurs',
          href: '/entreprise/supply-chain/fournisseurs',
          icon: Factory,
          description: 'Gestion des fournisseurs'
        },
        {
          name: 'Entrepôts',
          href: '/entreprise/supply-chain/entrepots',
          icon: Warehouse,
          description: 'Gestion des entrepôts'
        }
      ]
    },
    {
      name: 'Production',
      icon: PenTool,
      subItems: [
        {
          name: 'Planification',
          href: '/entreprise/production/planification',
          icon: ClipboardList,
          description: 'Planning de production'
        },
        {
          name: 'Qualité',
          href: '/entreprise/production/qualite',
          icon: Settings,
          description: 'Contrôle qualité'
        },
        {
          name: 'Performance',
          href: '/entreprise/production/performance',
          icon: TrendingUp,
          description: 'Suivi des performances'
        }
      ]
    },
    {
      name: 'Commercial',
      icon: ShoppingBag,
      subItems: [
        {
          name: 'Clients',
          href: '/entreprise/commercial/clients',
          icon: Users2,
          description: 'Gestion des clients'
        },
        {
          name: 'Devis',
          href: '/entreprise/commercial/devis',
          icon: FileText,
          description: 'Gestion des devis'
        },
        {
          name: 'Facturation',
          href: '/entreprise/commercial/facturation',
          icon: Calculator,
          description: 'Gestion de la facturation'
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
          <h2 className="text-sm font-medium text-purple-400">
            Entreprise & Fournisseurs
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {subModules.map((module) => (
            <div key={module.name} className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-purple-400">
                {module.name}
              </div>
              {module.subItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-dark-700/50'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 text-purple-400" />
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

export function Entreprise() {
  return (
    <ModuleLayout>
      <Routes>
        <Route index element={<EntrepriseDashboard />} />
        
        {/* Supply Chain */}
        <Route path="supply-chain" element={<div>Supply Chain</div>} />
        <Route path="supply-chain/commandes" element={<div>Commandes</div>} />
        <Route path="supply-chain/stock" element={<div>Stock</div>} />
        <Route path="supply-chain/fournisseurs" element={<div>Fournisseurs</div>} />
        <Route path="supply-chain/entrepots" element={<div>Entrepôts</div>} />
        
        {/* Production */}
        <Route path="production" element={<div>Production</div>} />
        <Route path="production/planification" element={<div>Planification</div>} />
        <Route path="production/qualite" element={<div>Qualité</div>} />
        <Route path="production/performance" element={<div>Performance</div>} />
        
        {/* Commercial */}
        <Route path="commercial" element={<div>Commercial</div>} />
        <Route path="commercial/clients" element={<div>Clients</div>} />
        <Route path="commercial/devis" element={<div>Devis</div>} />
        <Route path="commercial/facturation" element={<div>Facturation</div>} />
        
        {/* Fallback */}
        <Route path="*" element={<EntrepriseDashboard />} />
      </Routes>
    </ModuleLayout>
  );
}