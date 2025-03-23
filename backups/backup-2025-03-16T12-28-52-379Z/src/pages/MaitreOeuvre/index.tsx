import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DashboardStats } from '../../components/DashboardStats';
import { QuickActions } from '../../components/QuickActions';
import { ModuleNavbar } from '../../components/ModuleNavbar';
import { SubSidebar } from '../../components/SubSidebar';
import { 
  FolderPlus, Search, FileText, Calculator, ClipboardList, Calendar, 
  Receipt, MessageSquare, Wrench, FileBarChart, BarChart2, Cpu, FileCheck,
  Ruler, Thermometer, Book, Layout, HardHat
} from 'lucide-react';
import type { KPI } from '../../types';

export const moeModules = [
  {
    name: 'Gestion des Projets',
    href: '/maitre-oeuvre/gestion-projets',
    icon: FolderPlus,
    colorVar: '--module-maitreOeuvre',
    description: 'Gestion complète des projets',
    subModules: [
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
        icon: FileCheck,
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
  },
  {
    name: 'Analyses',
    href: '/maitre-oeuvre/analyses',
    icon: BarChart2,
    colorVar: '--module-maitreOeuvre',
    description: 'Analyses et optimisations',
    subModules: [
      {
        name: 'Analyse Financière',
        href: '/maitre-oeuvre/analyses/financiere',
        icon: Calculator,
        description: 'Études financières et budgétaires'
      },
      {
        name: 'Analyse Planning',
        href: '/maitre-oeuvre/analyses/planning',
        icon: Calendar,
        description: 'Vue synthétique des plannings'
      },
      {
        name: 'Analyse Technique',
        href: '/maitre-oeuvre/analyses/technique',
        icon: FileBarChart,
        description: 'Études techniques et réglementaires'
      },
      {
        name: 'Outils IA',
        href: '/maitre-oeuvre/analyses/ia',
        icon: Cpu,
        description: 'PLU, MH, architecture'
      }
    ]
  },
  {
    name: 'Outils',
    href: '/maitre-oeuvre/outils',
    icon: Wrench,
    colorVar: '--module-maitreOeuvre',
    description: 'Outils et réglementation',
    subModules: [
      {
        name: 'Outils Réglementaires',
        href: '/maitre-oeuvre/outils/reglementaires',
        icon: Book,
        description: 'Centralisation des normes'
      },
      {
        name: 'Outils Dimensionnement',
        href: '/maitre-oeuvre/outils/dimensionnement',
        icon: Ruler,
        description: 'Calcul et conception technique'
      },
      {
        name: 'RE2020',
        href: '/maitre-oeuvre/outils/re2020',
        icon: Thermometer,
        description: 'RE2020 et simulations thermiques'
      },
      {
        name: 'Documentation',
        href: '/maitre-oeuvre/outils/documentation',
        icon: FileText,
        description: 'Génération de documents MOE'
      }
    ]
  },
  {
    name: 'Chantier',
    href: '/maitre-oeuvre/chantier',
    icon: HardHat,
    colorVar: '--module-maitreOeuvre',
    description: 'Gestion des chantiers',
    subModules: [
      {
        name: 'Maquette & Plans',
        href: '/maitre-oeuvre/chantier/maquette',
        icon: Layout,
        description: 'Gestion des maquettes et plans'
      },
      {
        name: 'Suivi Chantier',
        href: '/maitre-oeuvre/chantier/suivi',
        icon: HardHat,
        description: 'Suivi personnalisé des travaux'
      }
    ]
  }
];

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
  const currentModule = moeModules.find(
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
        
        {/* Analyses */}
        <Route path="analyses" element={<div>Analyses</div>} />
        <Route path="analyses/financiere" element={<div>Analyse Financière</div>} />
        <Route path="analyses/planning" element={<div>Analyse Planning</div>} />
        <Route path="analyses/technique" element={<div>Analyse Technique</div>} />
        <Route path="analyses/ia" element={<div>Outils IA</div>} />
        
        {/* Outils */}
        <Route path="outils" element={<div>Outils</div>} />
        <Route path="outils/reglementaires" element={<div>Outils Réglementaires</div>} />
        <Route path="outils/dimensionnement" element={<div>Outils Dimensionnement</div>} />
        <Route path="outils/re2020" element={<div>RE2020</div>} />
        <Route path="outils/documentation" element={<div>Documentation</div>} />
        
        {/* Chantier */}
        <Route path="chantier" element={<div>Chantier</div>} />
        <Route path="chantier/maquette" element={<div>Maquette & Plans</div>} />
        <Route path="chantier/suivi" element={<div>Suivi Chantier</div>} />
        
        {/* Fallback */}
        <Route path="*" element={<MaitreOeuvreDashboard />} />
      </Routes>
    </ModuleLayout>
  );
}