import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Building2, MapPin, Euro, Clock, Upload, Plus,
  Leaf, Users2, Lightbulb, X, ChevronRight, Check
} from 'lucide-react';

interface ProjectFormData {
  name: string;
  description: string;
  location: string;
  budget: number;
  duration: string;
  type: 'startup' | 'real_estate' | 'infrastructure';
  impact: {
    environmental: string;
    social: string;
    innovation: string;
  };
  team: {
    name: string;
    role: string;
    image?: File;
  }[];
  images: File[];
  tags: string[];
}

interface ProjectFormProps {
  onSubmitSuccess?: () => void;
}

const initialFormData: ProjectFormData = {
  name: '',
  description: '',
  location: '',
  budget: 0,
  duration: '',
  type: 'startup',
  impact: {
    environmental: '',
    social: '',
    innovation: ''
  },
  team: [],
  images: [],
  tags: []
};

export function ProjectForm({ onSubmitSuccess }: ProjectFormProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const totalSteps = 4;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const { error } = await supabase
        .from('venture_projects')
        .insert([{
          user_id: user.id,
          ...formData,
          status: 'pending',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      onSubmitSuccess?.();
    } catch (err) {
      console.error('Error submitting project:', err);
      setSubmitError('Une erreur est survenue lors de la soumission du projet. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewProjects = () => {
    navigate('/venture/swipe');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-200">Informations générales</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom du projet
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-emerald-500/50"
                  placeholder="ex: ÉcoHabitat Modulaire"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-emerald-500/50 h-32"
                  placeholder="Décrivez votre projet en détail..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Localisation
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                        text-gray-200 focus:outline-none focus:border-emerald-500/50"
                      placeholder="Ville, Pays"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type de projet
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      type: e.target.value as ProjectFormData['type']
                    })}
                    className="w-full px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                      text-gray-200 focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="startup">Startup</option>
                    <option value="real_estate">Immobilier</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget estimé
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                        text-gray-200 focus:outline-none focus:border-emerald-500/50"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Durée estimée
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                        text-gray-200 focus:outline-none focus:border-emerald-500/50"
                      placeholder="ex: 18 mois"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-200">Impact du projet</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <label className="text-sm font-medium text-gray-300">
                    Impact environnemental
                  </label>
                </div>
                <textarea
                  value={formData.impact.environmental}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    impact: { ...formData.impact, environmental: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-emerald-500/50 h-24"
                  placeholder="Décrivez l'impact environnemental de votre projet..."
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users2 className="w-4 h-4 text-blue-400" />
                  <label className="text-sm font-medium text-gray-300">
                    Impact social
                  </label>
                </div>
                <textarea
                  value={formData.impact.social}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    impact: { ...formData.impact, social: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-emerald-500/50 h-24"
                  placeholder="Décrivez l'impact social de votre projet..."
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <label className="text-sm font-medium text-gray-300">
                    Innovation
                  </label>
                </div>
                <textarea
                  value={formData.impact.innovation}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    impact: { ...formData.impact, innovation: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-emerald-500/50 h-24"
                  placeholder="Décrivez les aspects innovants de votre projet..."
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-200">Équipe</h2>
            
            <div className="space-y-4">
              {formData.team.map((member, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-dark-700/30 border border-gray-700/50 relative"
                >
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      team: formData.team.filter((_, i) => i !== index)
                    })}
                    className="absolute top-2 right-2 p-1 rounded-lg hover:bg-dark-600/50 
                      text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => {
                          const newTeam = [...formData.team];
                          newTeam[index].name = e.target.value;
                          setFormData({ ...formData, team: newTeam });
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                          text-gray-200 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Rôle
                      </label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => {
                          const newTeam = [...formData.team];
                          newTeam[index].role = e.target.value;
                          setFormData({ ...formData, team: newTeam });
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                          text-gray-200 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  team: [...formData.team, { name: '', role: '' }]
                })}
                className="w-full p-4 rounded-lg border border-dashed border-gray-700/50 
                  hover:border-emerald-500/50 text-gray-400 hover:text-emerald-400 
                  transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter un membre
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-200">Médias</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Images du projet
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="aspect-video rounded-lg border border-dashed border-gray-700/50 
                        hover:border-emerald-500/50 transition-colors flex items-center justify-center"
                    >
                      <button 
                        type="button"
                        className="p-4 text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        <Upload className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 
                        border border-emerald-500/20 text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          tags: formData.tags.filter((_, i) => i !== index)
                        })}
                        className="p-0.5 rounded-full hover:bg-emerald-500/20 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Ajouter un tag..."
                    className="px-3 py-1 rounded-full bg-dark-700/50 border border-gray-700/50 
                      text-gray-200 focus:outline-none focus:border-emerald-500/50 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          setFormData({
                            ...formData,
                            tags: [...formData.tags, input.value.trim()]
                          });
                          input.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Étape {currentStep} sur {totalSteps}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-dark-700/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form content */}
      <form onSubmit={handleSubmit} className="glass-panel">
        <div className="p-6">
          {renderStep()}
          
          {submitError && (
            <div className="mt-4 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              {submitError}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="px-6 py-4 border-t border-gray-700/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                text-gray-400 hover:text-gray-300 hover:border-gray-600/50 transition-all 
                duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>

            <button
              type="button"
              onClick={handleViewProjects}
              className="px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                text-gray-400 hover:text-gray-300 hover:border-gray-600/50 transition-all duration-200"
            >
              Voir les projets
            </button>
          </div>

          {currentStep === totalSteps ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
                text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 
                transition-all duration-300 flex items-center gap-2 disabled:opacity-50 
                disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Soumission en cours...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Soumettre le projet
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
                text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 
                transition-all duration-300 flex items-center gap-2"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}