import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Search, ChevronRight } from 'lucide-react';

interface ProfileOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const profileOptions: ProfileOption[] = [
  {
    id: 'investor',
    title: 'Investisseur',
    description: 'Je souhaite découvrir et investir dans des projets innovants',
    icon: <Search className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'creator',
    title: 'Porteur de projet',
    description: 'Je souhaite présenter mon projet et trouver des investisseurs',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500'
  }
];

interface ProfileSelectionProps {
  onSelect: (profile: string) => void;
}

export function ProfileSelection({ onSelect }: ProfileSelectionProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 
          text-transparent bg-clip-text mb-4">
          Bienvenue sur Novaesta Venture
        </h1>
        <p className="text-gray-400">
          Sélectionnez votre profil pour commencer l'expérience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            className="glass-panel p-6 text-left group"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} 
              flex items-center justify-center mb-4`}>
              {option.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              {option.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              {option.description}
            </p>

            <div className={`inline-flex items-center gap-1 text-sm bg-gradient-to-r ${option.color} 
              text-transparent bg-clip-text font-medium group-hover:gap-2 transition-all duration-300`}>
              Commencer
              <ChevronRight className="w-4 h-4 stroke-emerald-500 group-hover:stroke-emerald-400 
                transition-colors duration-300" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}