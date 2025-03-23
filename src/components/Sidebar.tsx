import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Command, Boxes, ShoppingBag, Calculator, Hammer, Building2, Factory, 
  Users2, HomeIcon, Settings, LogOut, Sun, Moon, Lock
} from 'lucide-react';
import { Logo } from './Logo';
import { useTheme } from '../contexts/ThemeContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { motion } from 'framer-motion';
import { baseNavigation, premiumModules } from '../data/navigationConfig';

interface SidebarProps {
  onExpandChange: (expanded: boolean) => void;
  onSignOut: () => void;
}

export function Sidebar({ onExpandChange, onSignOut }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isFeatureAvailable, toggleFeature, activeFeatures } = useSubscription();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
      onExpandChange(false);
    }
  }, [isMobile, onExpandChange]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsExpanded(true);
    onExpandChange(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredModule(null);
      onExpandChange(false);
    }, 300);
  };

  const handleFeatureToggle = async (e: React.MouseEvent, module: typeof premiumModules[0]) => {
    e.preventDefault();
    e.stopPropagation();

    const success = await toggleFeature(module.featureName);
    if (!success) {
      navigate('/pricing');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsExpanded(false);
      onExpandChange(false);
    }
  };

  const NavItem = ({ item, isPremium = false }: { 
    item: typeof baseNavigation[0] & { featureName?: string }, 
    isPremium?: boolean 
  }) => {
    const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
    const isFeatureEnabled = isPremium ? activeFeatures.includes(item.featureName!) : true;
    const isHovered = hoveredModule === item.href;

    return (
      <div 
        className="relative"
        onMouseEnter={() => isPremium && setHoveredModule(item.href)}
        onMouseLeave={() => setHoveredModule(null)}
      >
        <button
          onClick={() => {
            if (isPremium && !isFeatureEnabled) {
              navigate('/pricing');
            } else {
              handleNavigation(item.href);
            }
          }}
          className={`w-full sidebar-item ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'} ${
            !isExpanded ? 'justify-center' : ''
          } ${!isFeatureEnabled ? 'opacity-50' : ''}`}
          title={!isExpanded ? item.name : undefined}
        >
          <item.icon 
            className={`h-4 w-4 flex-shrink-0 transition-colors duration-200 ${
              isExpanded ? 'mr-2' : 'mr-0'
            }`}
            style={{ color: `var(${item.colorVar})` }}
            strokeWidth={1.5}
          />
          
          {isExpanded && (
            <div className="flex items-center justify-between flex-1 min-w-0">
              <span className="truncate text-xs">
                {item.name}
              </span>
              {isPremium && (
                <motion.button
                  onClick={(e) => handleFeatureToggle(e, item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`ml-2 flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full 
                    border transition-colors duration-200 flex items-center gap-1
                    ${isFeatureEnabled 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                    }`}
                >
                  {isFeatureEnabled ? (
                    'Activé'
                  ) : (
                    <>
                      <Lock className="w-3 h-3" />
                      Premium
                    </>
                  )}
                </motion.button>
              )}
            </div>
          )}
        </button>

        {/* Submenu */}
        {isPremium && item.subModules && (isHovered || isActive) && (
          <div 
            className="absolute left-full top-0 ml-2 w-48 bg-dark-800/95 backdrop-blur-xl 
              border border-gray-700/50 rounded-lg overflow-hidden shadow-lg z-50"
          >
            {item.subModules.map((subModule) => (
              <NavLink
                key={subModule.href}
                to={subModule.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-xs transition-colors duration-200 ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-gray-400 hover:text-emerald-400 hover:bg-dark-700/50'
                  }`
                }
              >
                <subModule.icon className="w-4 h-4 mr-2" />
                <span className="truncate">{subModule.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={sidebarRef}
      className={`flex flex-col fixed left-0 top-0 h-screen sidebar-gradient transition-all duration-300 z-50 
        border-r border-[rgb(var(--border))] ${isMobile ? 'shadow-xl' : ''}`}
      style={{ width: isExpanded ? '16rem' : '4rem' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          onClick={toggleTheme}
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
            onSignOut();
            if (isMobile) {
              setIsExpanded(false);
              onExpandChange(false);
            }
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