import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import { DashboardStats } from '../../components/DashboardStats';
import { QuickActions } from '../../components/QuickActions';
import { 
  FolderPlus, FileText, Calculator, ClipboardList, Calendar, 
  Receipt, MessageSquare, Wrench, BarChart2
} from 'lucide-react';
import type { KPI } from '../../types';

const moeStats: KPI[] = [
  { label: 'Projets en cours', value: 8, change: 25, trend: 'up' },
  { label: 'Budget géré', value: 1500000, change: 15, trend: 'up' },
  { label: 'Taux de rentabilité', value: 22, change: 5, trend: 'up' },
  { label: 'Délais respectés', value: 95, change: 3, trend: 'up' }
];

function MaitreOeuvreDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
            Maître d'œuvre
          </h1>
          <p className="text-gray-400 mt-1">Vue d'ensemble de vos projets et activités</p>
        </div>
        <QuickActions />
      </div>

      <DashboardStats stats={moeStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-emerald-400 mb-4">Projets récents</h2>
          <div className="space-y-4">
            {['Résidence Les Jardins', 'Centre Commercial Est', 'École Primaire Nord'].map((project) => (
              <div key={project} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{project}</span>
                <span className="text-emerald-400/70 text-sm">En cours</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-lg font-semibold text-emerald-400 mb-4">Tâches prioritaires</h2>
          <div className="space-y-4">
            {[
              'Validation des plans d\'exécution',
              'Réunion de chantier hebdomadaire',
              'Mise à jour du planning général'
            ].map((task) => (
              <div key={task} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-400/20">
                <span className="text-gray-300">{task}</span>
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
      name: 'Gestion des Projets',
      icon: FolderPlus,
      subItems: [
        {
          name: 'Saisie & Répartition',
          href: '/maitre-oeuvre/gestion-projets/saisie',
          icon: FileText,
          description: 'Création et répartition des projets'
        },
        {
          name: 'Dashboard Projets',
          href: '/maitre-oeuvre/gestion-projets/dashboard',
          icon: BarChart2,
          description: 'Vue d\'ensemble et suivi global'
        },
        {
          name: 'Fiche Projet',
          href: '/maitre-oeuvre/gestion-projets/fiche',
          icon: FileText,
          description: 'Gestion détaillée du projet'
        },
        {
          name: 'Estimations & Honoraires',
          href: '/maitre-oeuvre/gestion-projets/estimations',
          icon: Calculator,
          description: 'Coûts prévisionnels et honoraires'
        },
        {
          name: 'Outils Administratifs',
          href: '/maitre-oeuvre/gestion-projets/administratif',
          icon: ClipboardList,
          description: 'CCTP, DPGF et documents administratifs'
        },
        {
          name: 'Planification & Suivi',
          href: '/maitre-oeuvre/gestion-projets/planification',
          icon: Calendar,
          description: 'Planification et suivi des travaux'
        },
        {
          name: 'Facturation & Décomptes',
          href: '/maitre-oeuvre/gestion-projets/facturation',
          icon: Receipt,
          description: 'Facturation et projets de décompte'
        },
        {
          name: 'Appels d\'Offres',
          href: '/maitre-oeuvre/gestion-projets/appels-offres',
          icon: MessageSquare,
          description: 'Gestion des appels d\'offres'
        },
        {
          name: 'Outils Techniques',
          href: '/maitre-oeuvre/gestion-projets/outils-techniques',
          icon: Wrench,
          description: 'Annotation de plans et CR assisté IA'
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
          <h2 className="text-sm font-medium text-emerald-400">
            Maître d'œuvre
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {subModules.map((module) => (
            <div key={module.name} className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-emerald-400">
                {module.name}
              </div>
              {module.subItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-dark-700/50'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 text-emerald-400" />
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

export function MaitreOeuvre() {
  return (
    <ModuleLayout>
      <Routes>
        <Route index element={<MaitreOeuvreDashboard />} />
        
        {/* Gestion des Projets */}
        <Route path="gestion-projets" element={<div>Gestion des Projets</div>} />
        <Route path="gestion-projets/saisie" element={<div>Saisie & Répartition</div>} />
        <Route path="gestion-projets/dashboard" element={<div>Dashboard Projets</div>} />
        <Route path="gestion-projets/fiche" element={<div>Fiche Projet</div>} />
        <Route path="gestion-projets/estimations" element={<div>Estimations & Honoraires</div>} />
        <Route path="gestion-projets/administratif" element={<div>Outils Administratifs</div>} />
        <Route path="gestion-projets/planification" element={<div>Planification & Suivi</div>} />
        <Route path="gestion-projets/facturation" element={<div>Facturation & Décomptes</div>} />
        <Route path="gestion-projets/appels-offres" element={<div>Appels d'Offres</div>} />
        <Route path="gestion-projets/outils-techniques" element={<div>Outils Techniques</div>} />
        
        {/* Fallback */}
        <Route path="*" element={<MaitreOeuvreDashboard />} />
      </Routes>
    </ModuleLayout>
  );
}