import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface ModuleLayoutProps {
  children: React.ReactNode;
  title: string;
  selectedModule: string | null;
}

export function ModuleLayout({ children, title, selectedModule }: ModuleLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-800 relative overflow-hidden">
      {/* Auréole lumineuse */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 
        opacity-0 transition-opacity duration-500 blur-3xl pointer-events-none"
        style={{ opacity: selectedModule ? 1 : 0 }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 p-6 border-b border-dark-400/20">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-dark-700/50 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
            {title}
          </h1>
        </div>

        {children}
      </div>
    </div>
  );
}