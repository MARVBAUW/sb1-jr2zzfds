import React, { useState } from 'react';
import { Search, Filter, Calendar, FileText, AlertTriangle, BookOpen, Scale, HardHat, Building2, Ruler, Thermometer, Leaf } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

const categoryIcons = {
  'security': HardHat,
  'construction': Building2,
  'standards': Ruler,
  'thermal': Thermometer,
  'environmental': Leaf,
  'legal': Scale,
  'technical': BookOpen,
};

const categories = [
  { id: 'security', label: 'Sécurité' },
  { id: 'construction', label: 'Construction' },
  { id: 'standards', label: 'Normes' },
  { id: 'thermal', label: 'Thermique' },
  { id: 'environmental', label: 'Environnement' },
  { id: 'legal', label: 'Juridique' },
  { id: 'technical', label: 'Technique' },
];

export function Workspace() {
  const { articles, loading, error } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(article.category);
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-800 p-6 flex items-center justify-center">
        <div className="text-cyan-400">Chargement des articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-800 p-6 flex items-center justify-center">
        <div className="text-rose-400">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Veille Réglementaire BTP
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                  text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 
                  focus:ring-1 focus:ring-cyan-500/50 w-64"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                hover:bg-dark-600/50 hover:border-cyan-500/50 transition-all duration-200"
            >
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="mb-6 p-4 rounded-lg bg-dark-700/50 border border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Filtrer par catégorie</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    selectedCategories.includes(category.id)
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                      : 'bg-dark-600/50 text-gray-400 border border-gray-700/50 hover:border-cyan-500/30'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {filteredArticles.map(article => {
            const Icon = categoryIcons[article.icon as keyof typeof categoryIcons];
            return (
              <div
                key={article.id}
                className="glass-panel p-6 transform transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    article.importance === 'high'
                      ? 'bg-rose-500/10 text-rose-400'
                      : article.importance === 'medium'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-200">{article.title}</h3>
                        <p className="mt-1 text-gray-400">{article.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                        article.importance === 'high'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : article.importance === 'medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {article.importance === 'high' ? 'Urgent' : 
                         article.importance === 'medium' ? 'Important' : 'Information'}
                      </span>
                      <span className="text-sm text-gray-400">
                        {categories.find(c => c.id === article.category)?.label}
                      </span>
                      <button className="ml-auto flex items-center gap-2 text-sm text-cyan-400 
                        hover:text-cyan-300 transition-colors duration-200">
                        <FileText className="w-4 h-4" />
                        Lire plus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}