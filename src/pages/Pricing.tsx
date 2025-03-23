import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Shield, Users, Zap, Check, Clock } from 'lucide-react';
import { VerificationModal } from '../components/VerificationModal';
import { useAuth } from '../contexts/AuthContext';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  users: string;
  modules: string;
  promotion?: {
    badge: string;
    description: string;
  };
}

const pricingTiers: PricingTier[] = [
  {
    name: 'STARTER',
    price: 49,
    description: 'Pour les petites équipes et les projets simples',
    users: "Jusqu'à trois utilisateurs",
    modules: 'Saas 360 + 1 module au choix',
    icon: Shield,
    color: 'from-cyan-500 to-blue-500',
    promotion: {
      badge: '15 jours gratuits',
      description: 'Essayez toutes les fonctionnalités gratuitement pendant 15 jours'
    },
    features: [
      'Gestion de projet basique',
      'Tableau de bord personnalisé',
      'Support par email',
      'Stockage 10GB',
      'Mises à jour régulières',
      'API Access (100 req/jour)',
      'Support 24/7'
    ]
  },
  {
    name: 'BUSINESS',
    price: 79,
    description: 'Pour les équipes en croissance',
    users: "Jusqu'à cinq utilisateurs",
    modules: 'Saas 360 + 2 modules au choix',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Toutes les fonctionnalités Starter',
      'Gestion de projet avancée',
      'Rapports personnalisés',
      'Stockage 50GB',
      'API Access (1000 req/jour)',
      'Support prioritaire',
      'Formation en ligne'
    ]
  },
  {
    name: 'PREMIUM',
    price: 120,
    description: 'Pour les grandes équipes et projets complexes',
    users: "Jusqu'à huit utilisateurs",
    modules: 'Accès complet',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    features: [
      'Toutes les fonctionnalités Business',
      'Accès illimité aux modules',
      'Stockage illimité',
      'API Access illimité',
      'Support dédié',
      'Formation sur site',
      'Personnalisation avancée'
    ]
  }
];

export function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  const handleStartTrial = (tier: PricingTier) => {
    setSelectedTier(tier);
    if (user) {
      navigate('/signup');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-transparent bg-clip-text mb-4">
            Des tarifs adaptés à vos besoins
          </h1>
          <p className="text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Choisissez le plan qui correspond le mieux à votre activité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className="glass-panel relative p-8 flex flex-col hover:scale-105 transition-transform duration-300"
            >
              {tier.promotion && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium shadow-lg">
                    <Clock className="w-4 h-4" />
                    {tier.promotion.badge}
                  </div>
                </div>
              )}

              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} 
                flex items-center justify-center mb-6`}>
                <tier.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-[rgb(var(--foreground))]">
                {tier.name}
              </h3>
              <p className="mt-4 text-[rgb(var(--muted-foreground))]">
                {tier.description}
              </p>

              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-bold text-[rgb(var(--foreground))]">
                  {tier.price}€
                </span>
                <span className="ml-2 text-[rgb(var(--muted-foreground))]">/mois</span>
              </div>

              {tier.promotion && (
                <p className="mt-2 text-sm text-emerald-400">
                  {tier.promotion.description}
                </p>
              )}

              <div className="mt-6 space-y-4">
                <p className="text-sm text-[rgb(var(--foreground))]">{tier.users}</p>
                <p className="text-sm text-[rgb(var(--foreground))]">{tier.modules}</p>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-[rgb(var(--foreground))]">
                    <Check className="w-5 h-5 text-emerald-400 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleStartTrial(tier)}
                className={`mt-8 w-full px-4 py-3 rounded-lg bg-gradient-to-r ${tier.color} 
                  text-white font-medium shadow-lg transition-all duration-300 
                  hover:shadow-xl hover:scale-[1.02] text-center`}
              >
                {tier.promotion ? "Commencer l'essai gratuit" : "Choisir ce forfait"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedTier && (
        <VerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onVerificationSuccess={() => navigate('/signup')}
          tier={selectedTier}
        />
      )}
    </div>
  );
}