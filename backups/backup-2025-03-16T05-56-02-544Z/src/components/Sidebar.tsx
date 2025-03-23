import React, { useState, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import { 
  Command, Boxes, ShoppingBag, Calculator, Hammer, Building2, Factory, 
  Users2, HomeIcon, Settings, LogOut, Sun, Moon
} from 'lucide-react';
import { Logo } from './Logo';
import { useTheme } from '../contexts/ThemeContext';

const baseNavigation = [
  { name: 'Dashboard', href: '/', icon: Command },
  { name: 'Workspace', href: '/workspace', icon: Boxes },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { name: 'Gestion Comptable', href: '/comptabilite', icon: Calculator }
];

const premiumModules = [
  { 
    name: 'Maître d\'oeuvre',
    href: '/maitre-oeuvre',
    icon: Hammer,
    color: 'from-emerald-400 to-teal-400',
    glow: 'group-hover:shadow-emerald-500/20',
    iconColor: 'text-emerald-400'
  },
  { 
    name: 'Maître d\'ouvrage',
    href: '/maitre-ouvrage',
    icon: Building2,
    color: 'from-blue-400 to-indigo-400',
    glow: 'group-hover:shadow-blue-500/20',
    iconColor: 'text-blue-400'
  },
  { 
    name: 'Entreprise et fournisseurs',
    href: '/entreprises',
    icon: Factory,
    color: 'from-purple-400 to-violet-400',
    glow: 'group-hover:shadow-purple-500/20',
    iconColor: 'text-purple-400'
  },
  { 
    name: 'Particuliers',
    href: '/particuliers',
    icon: Users2,
    color: 'from-amber-400 to-orange-400',
    glow: 'group-hover:shadow-amber-500/20',
    iconColor: 'text-amber-400'
  },
  { 
    name: 'Agents Immobiliers',
    href: '/agents',
    icon: HomeIcon,
    color: 'from-rose-400 to-pink-400',
    glow: 'group-hover:shadow-rose-500/20',
    iconColor: 'text-rose-400'
  },
];

interface SidebarProps {
  onExpandChange: (expanded: boolean) => void;
  onSignOut: () => void;
}

export function Sidebar({ onExpandChange, onSignOut }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [playClick] = useSound('/click.mp3', { volume: 0.5 });
  const { theme, toggleTheme } = useTheme();

  const handleExpandChange = (expanded: boolean) => {
    setIsExpanded(expanded);
    onExpandChange(expanded);
  };

  const NavItem = ({ item, isPremium = false }: { 
    item: typeof baseNavigation[0] & { color?: string; glow?: string; iconColor?: string }, 
    isPremium?: boolean 
  }) => {
    const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);

    return (
      <NavLink
        to={item.href}
        onClick={() => playClick()}
        className={`sidebar-item ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'} ${
          !isExpanded ? 'justify-center' : ''
        }`}
        title={!isExpanded ? item.name : undefined}
      >
        <item.icon 
          className={`h-4 w-4 flex-shrink-0 transition-colors duration-200 ${
            isExpanded ? 'mr-2' : 'mr-0'
          } ${isPremium ? item.iconColor : ''}`}
          strokeWidth={1.5}
        />
        
        {isExpanded && (
          <div className="flex items-center justify-between flex-1 min-w-0">
            <span className={`truncate transition-all duration-200 text-xs ${
              isPremium 
                ? `bg-gradient-to-r ${item.color} bg-clip-text text-transparent group-hover:shadow-lg ${item.glow}`
                : ''
            }`}>
              {item.name}
            </span>
            {isPremium && (
              <span className={`ml-2 flex-shrink-0 text-[10px] px-1 py-0.5 rounded-full 
                bg-gradient-to-r ${item.color} bg-clip-text text-transparent
                border border-[rgb(var(--border))] bg-[rgb(var(--hover))]`}>
                Premium
              </span>
            )}
          </div>
        )}
      </NavLink>
    );
  };

  return (
    <div 
      className="flex flex-col fixed left-0 top-0 h-screen sidebar-gradient transition-all duration-300 z-50 
        border-r border-[rgb(var(--border))]"
      style={{ width: isExpanded ? '16rem' : '4rem' }}
      onMouseEnter={() => handleExpandChange(true)}
      onMouseLeave={() => handleExpandChange(false)}
    >
      <div className={`flex-shrink-0 flex h-16 items-center gap-3 px-4 border-b border-[rgb(var(--border))] ${
        isExpanded ? 'justify-start' : 'justify-center'
      }`}>
        <Logo />
        {isExpanded && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text truncate">
            Novaesta
          </h1>
        )}
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-[rgb(var(--border))] scrollbar-track-transparent">
        <div className="flex-1 space-y-2 px-2 py-4">
          <div className="space-y-1">
            {baseNavigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {isExpanded && (
            <div className="px-4 py-2">
              <div className="h-px bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent" />
            </div>
          )}

          <div className="space-y-1">
            {premiumModules.map((item) => (
              <NavItem key={item.name} item={item} isPremium />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 p-4 border-t border-[rgb(var(--border))]">
        <button
          onClick={() => {
            playClick();
            toggleTheme();
          }}
          className={`sidebar-item mb-2 ${!isExpanded ? 'justify-center' : ''} ${
            theme === 'dark' 
              ? 'text-amber-400 hover:bg-amber-500/10' 
              : 'text-blue-400 hover:bg-blue-500/10'
          }`}
          title={!isExpanded ? (theme === 'dark' ? 'Mode clair' : 'Mode sombre') : undefined}
        >
          {theme === 'dark' ? (
            <Sun className={`h-4 w-4 flex-shrink-0 ${isExpanded ? 'mr-2' : 'mr-0'}`} strokeWidth={1.5} />
          ) : (
            <Moon className={`h-4 w-4 flex-shrink-0 ${isExpanded ? 'mr-2' : 'mr-0'}`} strokeWidth={1.5} />
          )}
          {isExpanded && (
            <span className="truncate">
              {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            </span>
          )}
        </button>

        <button 
          onClick={() => {
            playClick();
            onSignOut();
          }}
          className={`sidebar-item text-rose-400 hover:bg-rose-500/10 ${
            !isExpanded ? 'justify-center' : ''
          }`}
          title={!isExpanded ? 'Déconnexion' : undefined}
        >
          <LogOut className={`h-4 w-4 flex-shrink-0 ${isExpanded ? 'mr-2' : 'mr-0'}`} strokeWidth={1.5} />
          {isExpanded && <span className="truncate">Déconnexion</span>}
        </button>
      </div>
    </div>
  );
}