import React, { useState, useEffect } from 'react';
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

interface ModuleSidebarProps {
  title: string;
  modules: SubModule[];
  colorScheme: {
    primary: string;
    text: string;
    border: string;
    background: string;
  };
}

export function ModuleSidebar({ title, modules, colorScheme }: ModuleSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Auto-expand the current module and its parents
    const currentPath = location.pathname;
    const newExpandedModules = modules.reduce((acc: string[], module) => {
      if (currentPath.startsWith(module.href)) {
        acc.push(module.href);
      }
      return acc;
    }, []);
    setExpandedModules(newExpandedModules);
  }, [location.pathname, modules]);

  const toggleModule = (href: string) => {
    setExpandedModules(prev =>
      prev.includes(href)
        ? prev.filter(h => h !== href)
        : [...prev, href]
    );
  };

  const renderModules = (items: SubModule[], level = 0) => {
    return items.map(module => {
      const isActive = location.pathname.startsWith(module.href);
      const isExpanded = expandedModules.includes(module.href);
      const hasSubModules = module.subModules && module.subModules.length > 0;
      const Icon = module.icon;

      return (
        <div key={module.href} className={`space-y-1 ${level > 0 ? 'ml-4' : ''}`}>
          <div className="flex items-center">
            <NavLink
              to={module.href}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-200 flex-1 ${
                  isActive
                    ? 'bg-[rgb(var(--hover))] text-[rgb(var(--foreground))]'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--hover))]'
                }`
              }
            >
              <Icon className={`w-4 h-4 text-[rgb(var(--primary))]`} />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{module.name}</div>
                <div className="text-[10px] text-[rgb(var(--muted-foreground))] truncate">
                  {module.description}
                </div>
              </div>
            </NavLink>

            {hasSubModules && (
              <button
                onClick={() => toggleModule(module.href)}
                className={`p-1 rounded-lg hover:bg-[rgb(var(--hover))] text-[rgb(var(--primary))] 
                  transition-all duration-200 mr-2`}
              >
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>
            )}
          </div>

          {hasSubModules && (
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {isExpanded && renderModules(module.subModules!, level + 1)}
            </motion.div>
          )}
        </div>
      );
    });
  };

  return (
    <div 
      className="w-64 fixed left-16 top-0 h-screen bg-[rgb(var(--background))]/95 backdrop-blur-xl 
        border-r border-[rgb(var(--border))] flex flex-col"
    >
      <div className="h-16 border-b border-[rgb(var(--border))] flex items-center px-4">
        <h2 
          className="text-sm font-medium text-[rgb(var(--primary))]"
        >
          {title}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {renderModules(modules)}
      </div>
    </div>
  );
}