import React from 'react';
import { useLocation } from 'react-router-dom';
import { ModuleNavbar } from './ModuleNavbar';
import { SubSidebar } from './SubSidebar';
import { moduleColors } from '../data/moduleColors';

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

interface ModuleLayoutProps {
  children: React.ReactNode;
  modules: Module[];
  moduleName: keyof typeof moduleColors;
}

export function ModuleLayout({ children, modules, moduleName }: ModuleLayoutProps) {
  const location = useLocation();
  const currentModule = modules.find(
    module => location.pathname.startsWith(module.href)
  );

  const colors = moduleColors[moduleName];

  return (
    <div className="min-h-screen flex flex-col">
      {currentModule && (
        <>
          <ModuleNavbar 
            modules={currentModule.subModules || []} 
            colors={colors}
          />
          <SubSidebar
            isExpanded={true}
            module={currentModule}
            currentPath={location.pathname}
            onClose={() => {}}
          />
        </>
      )}
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
}