import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModuleNavbar } from '../../components/ModuleNavbar';
import { SubSidebar } from '../../components/SubSidebar';
import { ModuleKPIs } from '../../components/ModuleKPIs';
import { 
  Building2, FileText, Calculator, ClipboardList, Calendar, 
  Receipt, MessageSquare, Wrench, FileBarChart, BarChart2, Cpu,
  Ruler, Thermometer, Book, Layout, HardHat, DollarSign, Users2,
  PieChart, TrendingUp, FileSearch, Briefcase, Target
} from 'lucide-react';

export const maitreOuvrageModules = [
  {
    name: 'Gestion Patrimoniale',
    href: '/maitre-ouvrage/patrimoine',
    icon: Building2,
    colorVar: '--module-maitreOuvrage',
    description: 'Gestion du patrimoine immobilier',
    subModules: [
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
        icon: Users2,
        description: 'Suivi des locations'
      }
    ]
  },
  {
    name: 'Investissements',
    href: '/maitre-ouvrage/investissements',
    icon: TrendingUp,
    colorVar: '--module-maitreOuvrage',
    description: 'Gestion des investissements',
    subModules: [
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
        icon: PieChart,
        description: 'Suivi des performances'
      }
    ]
  }
];

function MaitreOuvrageDashboard() {
  return (
    <div className="space-y-6">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
          Maître d'ouvrage
        </h1>
        <p className="text-gray-400 mt-1">Gestion de patrimoine et investissements</p>
      </div>

      <ModuleKPIs module="maitreOuvrage" />
    </div>
  );
}

function ModuleLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentModule = maitreOuvrageModules.find(
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
        {currentModule && <ModuleKPIs module="maitreOuvrage" section={currentSection} />}
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