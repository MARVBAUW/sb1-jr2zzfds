import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import useSound from 'use-sound';
import { moeSubModules } from '../pages/MaitreOeuvre';

interface SubModule {
  name: string;
  href: string;
  icon: typeof ChevronRight;
  description: string;
  subModules?: SubModule[];
}

interface Module {
  name: string;
  href: string;
  icon: typeof ChevronRight;
  color?: string;
  glow?: string;
  iconColor?: string;
  subModules?: SubModule[];
}

interface SubSidebarProps {
  isExpanded: boolean;
  module?: Module;
  currentPath: string;
  onClose: () => void;
}

export function SubSidebar({ isExpanded, module, currentPath, onClose }: SubSidebarProps) {
  const [isSubMenuExpanded, setIsSubMenuExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [displayedModules, setDisplayedModules] = useState<SubModule[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [playClick] = useSound('/click.mp3', { volume: 0.5 });
  const location = useLocation();

  useEffect(() => {
    if (module?.href) {
      const section = module.href.split('/')[2];
      const subModules = moeSubModules[section as keyof typeof moeSubModules] || [];
      setDisplayedModules(subModules);

      // Automatically expand the current section
      const currentSection = location.pathname.split('/')[3];
      if (currentSection) {
        const matchingModule = subModules.find(m => m.href.includes(currentSection));
        if (matchingModule) {
          setExpandedSections(prev => [...prev, matchingModule.href]);
        }
      }
    }
  }, [module, location.pathname]);

  useEffect(() => {
    if (!isSubMenuExpanded) {
      setExpandedSections([]);
    }
  }, [isSubMenuExpanded]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsSubMenuExpanded(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsSubMenuExpanded(true);
  };

  const toggleSection = (href: string) => {
    playClick();
    setExpandedSections(prev => 
      prev.includes(href) 
        ? prev.filter(h => h !== href)
        : [...prev, href]
    );
  };

  const renderSubModules = (subModules: SubModule[], level: number = 0) => {
    return subModules.map((item) => {
      const isActive = currentPath.startsWith(item.href);
      const isSectionExpanded = expandedSections.includes(item.href);
      const showSubModules = item.subModules && (isActive || isSectionExpanded);

      return (
        <div key={item.href} className={`space-y-0.5 ${level > 0 ? 'ml-2' : ''}`}>
          <div className="flex items-center">
            <NavLink
              to={item.href}
              onClick={() => playClick()}
              className={({ isActive }) =>
                `group relative flex flex-1 items-center px-2 py-1 text-[10px] rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'hover:bg-gray-800/30 text-gray-300 hover:text-emerald-400'
                } ${!isSubMenuExpanded ? 'justify-center' : ''}`
              }
            >
              <div className="relative flex items-center">
                <item.icon 
                  className={`h-3 w-3 flex-shrink-0 transition-colors duration-200 ${
                    isSubMenuExpanded ? 'mr-1' : ''
                  } text-emerald-400/70`}
                  strokeWidth={1.5}
                />
                
                {!isSubMenuExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-dark-700/90 text-emerald-400 
                    text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 
                    pointer-events-none transition-opacity duration-200 border border-emerald-500/20">
                    {item.name}
                    <div className="text-[8px] text-emerald-400/50 mt-0.5">{item.description}</div>
                  </div>
                )}
              </div>
              
              {isSubMenuExpanded && (
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="truncate text-[10px] font-medium">
                    {item.name}
                  </span>
                  <span className="text-[8px] text-emerald-400/50 truncate mt-0.5">
                    {item.description}
                  </span>
                </div>
              )}
            </NavLink>

            {item.subModules && isSubMenuExpanded && (
              <button
                onClick={() => toggleSection(item.href)}
                className="p-0.5 mr-1 rounded-lg hover:bg-gray-800/30 text-emerald-400 
                  hover:text-emerald-300 transition-all duration-200"
              >
                <ChevronRight 
                  className={`h-3 w-3 transition-transform duration-200 ${
                    isSectionExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>
            )}
          </div>

          {showSubModules && item.subModules && isSubMenuExpanded && (
            <div className={`mt-0.5 space-y-0.5 border-l border-emerald-500/20 pl-2 
              overflow-hidden transition-all duration-200 ${
                isSectionExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
              {renderSubModules(item.subModules, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  if (!module?.subModules) return null;

  return (
    <div 
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed left-[64px] top-0 h-screen bg-dark-800/95 backdrop-blur-xl 
        border-r border-gray-700/50 transition-all duration-300 z-40 ${
        isExpanded 
          ? isSubMenuExpanded 
            ? 'w-64 translate-x-0 opacity-100' 
            : 'w-16 translate-x-0 opacity-100'
          : 'w-0 -translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex-shrink-0 h-16 border-b border-gray-700/50 flex items-center justify-between px-4">
        {isSubMenuExpanded && (
          <span className="text-xs font-medium text-emerald-400">{module.name}</span>
        )}
        <button
          onClick={() => {
            playClick();
            setIsSubMenuExpanded(!isSubMenuExpanded);
          }}
          className="p-1.5 rounded-lg hover:bg-gray-800/30 text-emerald-400 
            hover:text-emerald-300 transition-colors"
        >
          {isSubMenuExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700/50 
        scrollbar-track-transparent p-2">
        {renderSubModules(displayedModules)}
      </div>
    </div>
  );
}