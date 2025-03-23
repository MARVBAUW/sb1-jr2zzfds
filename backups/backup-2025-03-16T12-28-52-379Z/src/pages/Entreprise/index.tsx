import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModuleNavbar } from '../../components/ModuleNavbar';
import { SubSidebar } from '../../components/SubSidebar';
import { ModuleKPIs } from '../../components/ModuleKPIs';
import { Factory, Truck, Package, ShoppingBag, Users2, FileText, Calculator, BarChart2, Wrench, PenTool as Tool, Settings, Box, Warehouse, TrendingUp, DollarSign, ClipboardList } from 'lucide-react';

export const entrepriseModules = [
  {
    name: 'Supply Chain',
    href: '/entreprise/supply-chain',
    icon: Truck,
    colorVar: '--module-entreprise',
    description: 'Gestion de la chaîne logistique',
    subModules: [
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
      }
    ]
  },
  {
    name: 'Production',
    href: '/entreprise/production',
    icon: Tool,
    colorVar: '--module-entreprise',
    description: 'Gestion de la production',
    subModules: [
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
        name: 'Maintenance',
        href: '/entreprise/production/maintenance',
        icon: Wrench,
        description: 'Maintenance préventive'
      }
    ]
  },
  {
    name: 'Commercial',
    href: '/entreprise/commercial',
    icon: ShoppingBag,
    colorVar: '--module-entreprise',
    description: 'Gestion commerciale',
    subModules: [
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

function EntrepriseDashboard() {
  return (
    <div className="space-y-6">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 text-transparent bg-clip-text">
          Entreprise & Fournisseurs
        </h1>
        <p className="text-gray-400 mt-1">Gestion de la chaîne d'approvisionnement et production</p>
      </div>

      <ModuleKPIs module="entreprise" />
    </div>
  );
}

function ModuleLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentModule = entrepriseModules.find(
    module => location.pathname.startsWith(module.href)
  );

  const currentSection = location.pathname.split('/')[3] || 'default';

  return (
    <div className="min-h-screen flex flex-col">
      {currentModule && (
        <>
          <ModuleNavbar modules={currentModule.subModules || []} />
          <SubSidebar
            isExpanded={true}
            module={currentModule}
            currentPath={location.pathname}
            onClose={() => {}}
          />
        </>
      )}
      <div className="flex-1 ml-64">
        {children}
        {currentModule && <ModuleKPIs module="entreprise" section={currentSection} />}
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
        
        {/* Production */}
        <Route path="production" element={<div>Production</div>} />
        <Route path="production/planification" element={<div>Planification</div>} />
        <Route path="production/qualite" element={<div>Qualité</div>} />
        <Route path="production/maintenance" element={<div>Maintenance</div>} />
        
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