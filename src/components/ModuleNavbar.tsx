import React from 'react';
import { NavLink } from 'react-router-dom';

interface SubModule {
  name: string;
  href: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface ModuleNavbarProps {
  modules: SubModule[];
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    border: string;
    background: string;
    gradient: string;
  };
}

export function ModuleNavbar({ modules, colors }: ModuleNavbarProps) {
  return (
    <div className="bg-dark-800/95 backdrop-blur-xl border-b border-gray-700/50">
      <div className="flex items-center gap-1 px-4 h-12 overflow-x-auto scrollbar-thin 
        scrollbar-thumb-gray-700/50 scrollbar-track-transparent">
        {modules.map((module) => (
          <NavLink
            key={module.href}
            to={module.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-1.5 rounded-lg text-xs transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? `bg-opacity-10 text-opacity-100 ${
                      colors 
                        ? `bg-${colors.gradient} text-${colors.primary}`
                        : 'bg-emerald-500/10 text-emerald-400'
                    } border border-${colors?.border || 'emerald-500/20'}`
                  : 'text-gray-400 hover:text-gray-300 hover:bg-dark-700/50'
              }`
            }
          >
            {module.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}