import { 
  Command, Boxes, ShoppingBag, Calculator, Settings,
  Hammer, Building2, Factory, Users2, HomeIcon,
  FileText, BarChart2, Wrench, HardHat
} from 'lucide-react';

export const baseNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Command, colorVar: '--icon-dashboard' },
  { name: 'Workspace', href: '/workspace', icon: Boxes, colorVar: '--icon-workspace' },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag, colorVar: '--icon-marketplace' },
  { name: 'Gestion Comptable', href: '/comptabilite', icon: Calculator, colorVar: '--icon-accounting' },
  { name: 'Paramètres', href: '/settings', icon: Settings, colorVar: '--icon-settings' }
];

export const premiumModules = [
  { 
    name: 'Maître d\'oeuvre',
    href: '/maitre-oeuvre',
    icon: Hammer,
    colorVar: '--module-maitreOeuvre',
    featureName: 'module_maitre_oeuvre'
  },
  { 
    name: 'Maître d\'ouvrage',
    href: '/maitre-ouvrage',
    icon: Building2,
    colorVar: '--module-maitreOuvrage',
    featureName: 'module_maitre_ouvrage'
  },
  { 
    name: 'Entreprise et fournisseurs',
    href: '/entreprise',
    icon: Factory,
    colorVar: '--module-entreprise',
    featureName: 'module_entreprise'
  },
  { 
    name: 'Particuliers',
    href: '/particuliers',
    icon: Users2,
    colorVar: '--module-particuliers',
    featureName: 'module_particuliers'
  },
  { 
    name: 'Agents Immobiliers',
    href: '/agents',
    icon: HomeIcon,
    colorVar: '--module-agents',
    featureName: 'module_agents'
  },
];

export const moeModules = [
  {
    name: 'Gestion des Projets',
    href: '/maitre-oeuvre/gestion-projets',
    icon: FileText,
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
        icon: FileText,
        description: 'Gestion détaillée du projet'
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
        icon: BarChart2,
        description: 'Vue synthétique des plannings'
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
        name: 'Suivi Chantier',
        href: '/maitre-oeuvre/chantier/suivi',
        icon: Wrench,
        description: 'Suivi des travaux'
      }
    ]
  }
];