import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModuleNavbar } from '../../components/ModuleNavbar';
import { SubSidebar } from '../../components/SubSidebar';
import { ModuleKPIs } from '../../components/ModuleKPIs';
import { ParticuliersDashboard } from './Dashboard';
import { 
  Users2, Home, Calculator, FileText, Building2, Wallet,
  PiggyBank, TrendingUp, FileSearch, Key, DollarSign, 
  ClipboardList, Wrench, Calendar
} from 'lucide-react';

export const particuliersModules = [
  {
    name: 'Patrimoine',
    href: '/particuliers/patrimoine',
    icon: Home,
    colorVar: '--module-particuliers',
    description: 'Gestion de patrimoine',
    subModules: [
      {
        name: 'Biens',
        href: '/particuliers/patrimoine/biens',
        icon: Building2,
        description: 'Liste des biens'
      },
      {
        name: 'Finances',
        href: '/particuliers/patrimoine/finances',
        icon: Wallet,
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
    href: '/particuliers/location',
    icon: Key,
    colorVar: '--module-particuliers',
    description: 'Gestion locative',
    subModules: [
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
    href: '/particuliers/documents',
    icon: FileText,
    colorVar: '--module-particuliers',
    description: 'Gestion documentaire',
    subModules: [
      {
        name: 'Contrats',
        href: '/particuliers/documents/contrats',
        icon: FileSearch,
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

function ModuleLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentModule = particuliersModules.find(
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
        {currentModule && <ModuleKPIs module="particuliers" section={currentSection} />}
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