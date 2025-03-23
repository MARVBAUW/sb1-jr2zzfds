import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderPlus, Search, X } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: string;
  location: string;
}

const mockProjects: Project[] = [
  { id: '1', name: 'Résidence Les Jardins', status: 'En cours', location: 'Paris' },
  { id: '2', name: 'Centre Commercial Est', status: 'Étude', location: 'Lyon' },
  { id: '3', name: 'École Primaire Nord', status: 'Travaux', location: 'Marseille' },
  { id: '4', name: 'Bureaux Centre-Ville', status: 'En cours', location: 'Bordeaux' },
  { id: '5', name: 'Complexe Sportif', status: 'Planification', location: 'Toulouse' },
];

export function QuickActions() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    navigate('/maitre-oeuvre/gestion-projets/saisie-repartition');
    setIsSearchOpen(false);
  };

  const handleProjectSelect = (projectId: string) => {
    navigate(`/maitre-oeuvre/gestion-projets/fiche?id=${projectId}`);
    setIsSearchOpen(false);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Quick Project Creation */}
      <button
        onClick={handleCreateProject}
        className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 
          hover:bg-emerald-500/20 transition-all duration-200 group"
        title="Créer un nouveau projet"
      >
        <FolderPlus className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Quick Project Search */}
      <div className="relative">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 
            hover:bg-emerald-500/20 transition-all duration-200 group"
          title="Rechercher un projet"
        >
          {isSearchOpen ? (
            <X className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
          ) : (
            <Search className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
          )}
        </button>

        {/* Search Panel */}
        <div className={`absolute right-0 top-full mt-2 w-96 rounded-xl bg-dark-700/95 backdrop-blur-xl 
          border border-emerald-500/20 shadow-lg transform transition-all duration-200 origin-top-right
          ${isSearchOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
        >
          <div className="p-4">
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-dark-600/50 border border-emerald-500/20 
                text-emerald-100 placeholder-emerald-500/50 focus:outline-none focus:border-emerald-500/40"
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectSelect(project.id)}
                className="w-full p-4 flex items-start hover:bg-emerald-500/10 transition-colors duration-200"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-emerald-400 font-medium">{project.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-emerald-500/70">{project.location}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                    <span className="text-sm text-emerald-500/70">{project.status}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}