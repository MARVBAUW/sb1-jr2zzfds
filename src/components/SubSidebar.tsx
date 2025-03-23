import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (module?.href) {
      // Automatically expand the current section and its parent sections
      const pathParts = location.pathname.split('/').filter(Boolean);
      const currentModuleParts = module.href.split('/').filter(Boolean);
      const remainingParts = pathParts.slice(currentModuleParts.length);

      if (remainingParts.length > 0) {
        let currentPath = `/${currentModuleParts.join('/')}`;
        const newExpandedSections = [];

        for (const part of remainingParts) {
          currentPath += `/${part}`;
          newExpandedSections.push(currentPath);
        }

        setExpandedSections(newExpandedSections);
      }
    }
  }, [module, location.pathname]);

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
        <div key={item.href} className={`space-y-0.5 ${level > 0 ? 'ml-4' : ''}`}>
          <div className="flex items-center">
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `group relative flex flex-1 items-center px-3 py-2 text-[10px] rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[rgb(var(--hover))] text-[rgb(var(--foreground))]'
                    : 'hover:bg-[rgb(var(--hover))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                }`
              }
            >
              <div className="relative flex items-center gap-3">
                <Icon 
                  className="h-4 w-4 flex-shrink-0 transition-colors duration-200"
                  style={{ color: getModuleColor() }}
                />
                
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-medium">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[rgb(var(--muted-foreground))] truncate">
                    {item.description}
                  </span>
                </div>
              </div>
            </NavLink>

            {item.subModules && item.subModules.length > 0 && (
              <button
                onClick={() => toggleSection(item.href)}
                className="p-1 mr-2 rounded-lg hover:bg-[rgb(var(--hover))] transition-all duration-200"
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

          {showSubModules && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isSectionExpanded ? 1 : 0,
                height: isSectionExpanded ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="mt-1 space-y-1 border-l-2 pl-3"
              style={{ borderColor: `${getModuleColor()}20` }}
            >
              {renderSubModules(item.subModules!, level + 1)}
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
      className="fixed left-[64px] top-0 h-screen bg-[rgb(var(--background))]/95 backdrop-blur-xl 
        border-r border-[rgb(var(--border))] transition-all duration-300 z-40 w-64"
    >
      <div className="flex-shrink-0 h-16 border-b border-[rgb(var(--border))] flex items-center justify-between px-4">
        <span className="text-xs font-medium" style={{ color: getModuleColor() }}>
          {module?.name}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {renderSubModules(module?.subModules || [])}
      </div>
    </div>
  );
}