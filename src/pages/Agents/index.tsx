import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { DashboardStats } from '../../components/DashboardStats';
import { QuickActions } from '../../components/QuickActions';
import { 
  HomeIcon, Users2, FileText, Calculator, Building2, Search, Target, 
  TrendingUp, MessageSquare, Calendar, MapPin, BarChart as ChartBar, 
  Mail, Phone, BellRing
} from 'lucide-react';
import type { KPI } from '../../types';

const agentsStats: KPI[] = [
  { label: 'Mandats actifs', value: 24, change: 20, trend: 'up' },
  { label: 'Visites/semaine', value: 15, change: 25, trend: 'up' },
  { label: 'Taux conversion', value: 4.2, change: 0.5, trend: 'up' },
  { label: 'CA mensuel', value: 28000, change: 12, trend: 'up' }
];

function AgentsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 text-transparent bg-clip-text">
            Agents Immobiliers
          </h1>
          <p className="text-gray-400 mt-1">Vue d'ensemble de votre activité commerciale</p>
        </div>
        <QuickActions />
      </div>

      <DashboardStats stats={agentsStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-rose-400 mb-4">Mandats récents</h2>
          <div className="space-y-4">
            {['Appartement Paris 15e', 'Maison Bordeaux', 'Studio Lyon'].map((mandat) => (
              <div key={mandat} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{mandat}</span>
                <span className="text-rose-400/70 text-sm">Actif</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-rose-400 mb-4">Rendez-vous</h2>
          <div className="space-y-4">
            {[
              'Visite Appartement Paris',
              'Signature mandat Bordeaux',
              'Estimation Maison Lyon'
            ].map((rdv) => (
              <div key={rdv} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{rdv}</span>
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
      name: 'Mandats',
      icon: HomeIcon,
      subItems: [
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
      icon: Users2,
      subItems: [
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
      icon: TrendingUp,
      subItems: [
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

  return (
    <div className="min-h-screen flex">
      {/* Submenu Sidebar */}
      <div className="w-64 fixed left-16 top-0 h-screen bg-dark-800/95 backdrop-blur-xl 
        border-r border-gray-700/50 flex flex-col">
        <div className="h-16 border-b border-gray-700/50 flex items-center px-4">
          <h2 className="text-sm font-medium text-rose-400">
            Agents Immobiliers
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {subModules.map((module) => (
            <div key={module.name} className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-rose-400">
                {module.name}
              </div>
              {module.subItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-rose-500/10 text-rose-400'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-dark-700/50'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 text-rose-400" />
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