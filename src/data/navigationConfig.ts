import { 
  Command, Boxes, ShoppingBag, Calculator, Settings,
  Hammer, Building2, Factory, Users2, HomeIcon
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