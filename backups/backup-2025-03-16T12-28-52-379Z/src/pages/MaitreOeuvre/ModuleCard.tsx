import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

export function ModuleCard({ title, description, icon: Icon, isSelected, onClick }: ModuleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-6 rounded-xl transition-all duration-300 group
        ${isSelected 
          ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20' 
          : 'bg-dark-700/30 hover:bg-dark-700/50 border-dark-400/20'
        } border backdrop-blur-xl`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg transition-colors duration-300
          ${isSelected
            ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-400'
            : 'bg-dark-600/50 text-gray-400 group-hover:text-emerald-400'
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium mb-1 transition-colors duration-300
            ${isSelected ? 'text-emerald-400' : 'text-gray-200 group-hover:text-emerald-400'}`}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-400 truncate">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}