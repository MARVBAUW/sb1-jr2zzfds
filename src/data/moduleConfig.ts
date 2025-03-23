import { 
  Command, Boxes, ShoppingBag, Calculator, Settings,
  Hammer, Building2, Factory, Users2, HomeIcon,
  FileText, BarChart2, Wrench, HardHat, Calendar, Receipt, 
  MessageSquare, ClipboardList, PiggyBank, Key, DollarSign, 
  FileSearch, Phone, BarChart as ChartBar, Mail, MapPin, 
  BellRing, Target, Search, TrendingUp, Briefcase
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