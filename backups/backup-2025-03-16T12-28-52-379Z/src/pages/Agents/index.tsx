import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModuleNavbar } from '../../components/ModuleNavbar';
import { SubSidebar } from '../../components/SubSidebar';
import { AgentsDashboard } from './Dashboard';
import { HomeIcon, Users2, FileText, Calculator, Building2, Search, Target, TrendingUp, MessageSquare, Calendar, MapPin, BarChart as ChartBar, Mail, Phone, BellRing, Settings } from 'lucide-react';

export const agentsModules = [
  {
    name: 'Mandats',
    href: '/agents/mandats',
    icon: HomeIcon,
    colorVar: '--module-agents',
    description: 'Gestion des mandats',
    subModules: [
      {
        name: 'Portefeuille',
        href: '/agents/mandats/portefeuille',
        icon: Building2,
        description: 'Liste des biens'
      },
      {
        name: 'Prospection',
        href: '/agents/mandats/prospection',
        icon: Search,
        description: 'Recherche de biens'
      },
      {
        name: 'Objectifs',
        href: '/agents/mandats/objectifs',
        icon: Target,
        description: 'Suivi des objectifs'
      }
    ]
  },
  {
    name: 'Clients',
    href: '/agents/clients',
    icon: Users2,
    colorVar: '--module-agents',
    description: 'Gestion des clients',
    subModules: [
      {
        name: 'Contacts',
        href: '/agents/clients/contacts',
        icon: Phone,
        description: 'Liste des contacts'
      },
      {
        name: 'Suivi',
        href: '/agents/clients/suivi',
        icon: ChartBar,
        description: 'Suivi des relations'
      },
      {
        name: 'Communication',
        href: '/agents/clients/communication',
        icon: Mail,
        description: 'Outils de communication'
      }
    ]
  },
  {
    name: 'Activité',
    href: '/agents/activite',
    icon: TrendingUp,
    colorVar: '--module-agents',
    description: 'Suivi d\'activité',
    subModules: [
      {
        name: 'Agenda',
        href: '/agents/activite/agenda',
        icon: Calendar,
        description: 'Planning des RDV'
      },
      {
        name: 'Visites',
        href: '/agents/activite/visites',
        icon: MapPin,
        description: 'Gestion des visites'
      },
      {
        name: 'Notifications',
        href: '/agents/activite/notifications',
        icon: BellRing,
        description: 'Centre de notifications'
      }
    ]
  }
];

function ModuleLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentModule = agentsModules.find(
    module => location.pathname.startsWith(module.href)
  );

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
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
}

export function Agents() {
  return (
    <ModuleLayout>
      <Routes>
        <Route index element={<AgentsDashboard />} />
        
        {/* Mandats */}
        <Route path="mandats" element={<div>Mandats</div>} />
        <Route path="mandats/portefeuille" element={<div>Portefeuille</div>} />
        <Route path="mandats/prospection" element={<div>Prospection</div>} />
        <Route path="mandats/objectifs" element={<div>Objectifs</div>} />
        
        {/* Clients */}
        <Route path="clients" element={<div>Clients</div>} />
        <Route path="clients/contacts" element={<div>Contacts</div>} />
        <Route path="clients/suivi" element={<div>Suivi</div>} />
        <Route path="clients/communication" element={<div>Communication</div>} />
        
        {/* Activité */}
        <Route path="activite" element={<div>Activité</div>} />
        <Route path="activite/agenda" element={<div>Agenda</div>} />
        <Route path="activite/visites" element={<div>Visites</div>} />
        <Route path="activite/notifications" element={<div>Notifications</div>} />
        
        {/* Fallback */}
        <Route path="*" element={<AgentsDashboard />} />
      </Routes>
    </ModuleLayout>
  );
}