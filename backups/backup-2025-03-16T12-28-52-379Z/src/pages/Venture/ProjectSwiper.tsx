import React, { useState, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import { motion } from 'framer-motion';
import { 
  MapPin, Euro, Clock, Users2, Leaf, Lightbulb, 
  ChevronLeft, ChevronRight, Heart, X, Share2 
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  budget: number;
  duration: string;
  team: string[];
  impact: {
    environmental: string;
    social: string;
    innovation: string;
  };
  images: string[];
  tags: string[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'ÉcoHabitat Modulaire',
    description: 'Construction de logements modulaires écologiques utilisant des matériaux biosourcés et des technologies innovantes pour réduire l\'empreinte carbone.',
    location: 'Bordeaux, France',
    budget: 2500000,
    duration: '18 mois',
    team: ['Marie Laurent - Architecte', 'Thomas Dubois - Ingénieur structure', 'Sophie Martin - Expert environnemental'],
    impact: {
      environmental: 'Réduction de 75% des émissions de CO2 par rapport aux constructions traditionnelles',
      social: 'Création de 20 emplois locaux et formation aux techniques écologiques',
      innovation: 'Système breveté de modules préfabriqués en matériaux biosourcés'
    },
    images: [
      'https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Écologique', 'Innovation', 'Construction', 'Modulaire']
  },
  {
    id: '2',
    name: 'Smart City Solutions',
    description: 'Développement d\'une plateforme IoT pour optimiser la gestion énergétique des bâtiments commerciaux et réduire leur consommation.',
    location: 'Lyon, France',
    budget: 1800000,
    duration: '24 mois',
    team: ['Paul Durand - CTO', 'Emma Bernard - Product Manager', 'Lucas Petit - IoT Expert'],
    impact: {
      environmental: 'Économie d\'énergie moyenne de 35% sur les bâtiments équipés',
      social: 'Amélioration du confort des occupants et réduction des charges',
      innovation: 'IA prédictive pour l\'optimisation énergétique en temps réel'
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Smart Building', 'IoT', 'Énergie', 'Tech']
  },
  {
    id: '3',
    name: 'Puits Carbone Urbain',
    description: 'Création d\'un réseau de micro-forêts urbaines verticales intégrant des technologies de capture de CO2.',
    location: 'Paris, France',
    budget: 3500000,
    duration: '36 mois',
    team: ['Claire Moreau - Biologiste', 'Antoine Lefevre - Urbaniste', 'Julie Roux - Ingénieur environnemental'],
    impact: {
      environmental: 'Capture de 1000 tonnes de CO2 par an en milieu urbain',
      social: 'Création d\'espaces verts accessibles et amélioration de la qualité de l\'air',
      innovation: 'Système breveté de culture verticale haute densité'
    },
    images: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Environnement', 'Innovation', 'Urbain', 'CO2']
  },
  {
    id: '4',
    name: 'Rénovation Circulaire',
    description: 'Programme de rénovation énergétique utilisant des matériaux recyclés et réemployés, avec traçabilité blockchain.',
    location: 'Nantes, France',
    budget: 1200000,
    duration: '12 mois',
    team: ['Marc Dupont - Chef de projet', 'Sarah Cohen - Experte économie circulaire', 'Yann Girard - Architecte'],
    impact: {
      environmental: '90% de matériaux réemployés ou recyclés',
      social: 'Formation et emploi de personnes en réinsertion',
      innovation: 'Plateforme blockchain de traçabilité des matériaux'
    },
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Rénovation', 'Économie circulaire', 'Blockchain', 'Social']
  },
  {
    id: '5',
    name: 'AgriTech Urbaine',
    description: 'Fermes verticales intelligentes intégrées aux nouveaux programmes immobiliers pour une production alimentaire locale.',
    location: 'Toulouse, France',
    budget: 2800000,
    duration: '24 mois',
    team: ['Léa Martin - Agronome', 'Hugo Blanc - Automaticien', 'Marie Dubois - Architecte'],
    impact: {
      environmental: 'Production locale réduisant de 90% les émissions liées au transport',
      social: 'Création d\'emplois locaux et accès à une alimentation saine',
      innovation: 'Système hydroponique automatisé à haute efficience'
    },
    images: [
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595573250993-d5e7a5b8c65c?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Agriculture', 'Innovation', 'Smart City', 'Alimentation']
  }
];

export function ProjectSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentProject = mockProjects[currentIndex];

  const childRefs = useMemo(
    () => Array(mockProjects.length).fill(0).map(() => React.createRef<any>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    setCurrentImageIndex(0);
  };

  const swiped = (direction: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index + 1);
  };

  const outOfFrame = (idx: number) => {
    currentIndex === idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: string) => {
    if (currentIndex < mockProjects.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < currentProject.images.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  if (currentIndex >= mockProjects.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px]">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">
          Plus de projets disponibles
        </h2>
        <p className="text-gray-400 mb-8">
          Revenez plus tard pour découvrir de nouveaux projets innovants
        </p>
        <button
          onClick={() => updateCurrentIndex(0)}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
            text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 
            transition-all duration-300"
        >
          Revoir les projets
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="relative h-[600px]">
        {mockProjects.map((project, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={project.id}
            onSwipe={(dir) => swiped(dir, index)}
            onCardLeftScreen={() => outOfFrame(index)}
            className="absolute"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full glass-panel overflow-hidden"
            >
              {/* Image carousel */}
              <div className="relative h-64">
                <img
                  src={project.images[currentImageIndex]}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />

                {/* Image navigation */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="p-2 rounded-full bg-dark-900/50 text-white 
                      hover:bg-dark-900/70 transition-colors"
                    disabled={currentImageIndex === 0}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="p-2 rounded-full bg-dark-900/50 text-white 
                      hover:bg-dark-900/70 transition-colors"
                    disabled={currentImageIndex === project.images.length - 1}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Project tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs bg-dark-900/50 text-white 
                        border border-white/10 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-200 mb-2">
                  {project.name}
                </h2>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Euro className="w-4 h-4" />
                    {new Intl.NumberFormat('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR',
                      maximumFractionDigits: 0
                    }).format(project.budget)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.duration}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-medium text-emerald-400">Impact environnemental</h3>
                    </div>
                    <p className="text-xs text-gray-400">{project.impact.environmental}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Users2 className="w-4 h-4 text-blue-400" />
                      <h3 className="text-sm font-medium text-blue-400">Impact social</h3>
                    </div>
                    <p className="text-xs text-gray-400">{project.impact.social}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <h3 className="text-sm font-medium text-amber-400">Innovation</h3>
                    </div>
                    <p className="text-xs text-gray-400">{project.impact.innovation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </TinderCard>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => swipe('left')}
          className="p-4 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 
            hover:bg-rose-500/20 transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <button
          onClick={() => swipe('right')}
          className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 
            hover:bg-emerald-500/20 transition-all duration-200"
        >
          <Heart className="w-6 h-6" />
        </button>
        <button
          className="p-4 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 
            hover:bg-blue-500/20 transition-all duration-200"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}