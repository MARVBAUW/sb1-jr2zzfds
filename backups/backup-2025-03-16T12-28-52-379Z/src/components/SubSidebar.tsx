import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubModule {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  subModules?: SubModule[];
}

interface Module {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  colorVar: string;
  description: string;
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
  const location = useLocation();

  useEffect(() => {
    if (module?.href) {
      const subModules = module.subModules || [];
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
    setExpandedSections(prev => 
      prev.includes(href) 
        ? prev.filter(h => h !== href)
        : [...prev, href]
    );
  };

  const getModuleColor = () => {
    if (!module?.colorVar) return 'var(--icon-dashboard)';
    return `var(${module.colorVar})`;
  };

  const renderSubModules = (subModules: SubModule[], level: number = 0) => {
    return subModules.map((item) => {
      const isActive = currentPath.startsWith(item.href);
      const isSectionExpanded = expandedSections.includes(item.href);
      const showSubModules = item.subModules && (isActive || isSectionExpanded);
      const Icon = item.icon;

      return (
        <div key={item.href} className={`space-y-0.5 ${level > 0 ? 'ml-2' : ''}`}>
          <div className="flex items-center">
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `group relative flex flex-1 items-center px-2 py-1 text-[10px] rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-opacity-10 text-opacity-100'
                    : 'hover:bg-gray-800/30 text-gray-300 hover:text-opacity-100'
                } ${!isSubMenuExpanded ? 'justify-center' : ''}`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? `${getModuleColor()}20` : '',
                color: isActive ? getModuleColor() : ''
              })}
            >
              <div className="relative flex items-center">
                <Icon 
                  className={`h-3 w-3 flex-shrink-0 transition-colors duration-200 ${
                    isSubMenuExpanded ? 'mr-1' : ''
                  }`}
                  style={{ color: getModuleColor() }}
                />
                
                {!isSubMenuExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute left-full ml-2 px-2 py-1 bg-dark-700/90 rounded-md whitespace-nowrap 
                      pointer-events-none transition-opacity duration-200 border"
                    style={{
                      color: getModuleColor(),
                      borderColor: `${getModuleColor()}20`
                    }}
                  >
                    {item.name}
                    <div className="text-[8px] mt-0.5 opacity-50">{item.description}</div>
                  </motion.div>
                )}
              </div>
              
              {isSubMenuExpanded && (
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="truncate text-[10px] font-medium">
                    {item.name}
                  </span>
                  <span className="text-[8px] opacity-50 truncate mt-0.5">
                    {item.description}
                  </span>
                </div>
              )}
            </NavLink>

            {item.subModules && isSubMenuExpanded && (
              <button
                onClick={() => toggleSection(item.href)}
                className="p-0.5 mr-1 rounded-lg hover:bg-gray-800/30 transition-all duration-200"
                style={{ color: getModuleColor() }}
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
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isSectionExpanded ? 1 : 0,
                height: isSectionExpanded ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="mt-0.5 space-y-0.5 border-l pl-2 overflow-hidden"
              style={{ borderColor: `${getModuleColor()}20` }}
            >
              {renderSubModules(item.subModules, level + 1)}
            </motion.div>
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
          <span className="text-xs font-medium" style={{ color: getModuleColor() }}>
            {module.name}
          </span>
        )}
        <button
          onClick={() => {
            setIsSubMenuExpanded(!isSubMenuExpanded);
          }}
          className="p-1.5 rounded-lg hover:bg-gray-800/30 transition-colors"
          style={{ color: getModuleColor() }}
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