import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { 
  Building2, Calculator, Cpu, Users2, Hammer, FileText, Brain, 
  BarChart2, Wallet, Shield, Rocket, ChevronRight, CheckCircle2,
  Factory, HomeIcon, PieChart, Settings, Target, Zap, HardHat,
  Store, TrendingUp, Briefcase, DollarSign, Handshake, Search,
  Truck, Package, Wrench, ClipboardCheck, ShoppingBag, UserCheck
} from 'lucide-react';

const features = [
  {
    title: "Conception & Planification",
    description: "Outils avancés pour la modélisation, le dimensionnement et la gestion des autorisations.",
    icon: Building2,
    color: "from-blue-400 to-cyan-400"
  },
  {
    title: "Gestion de Patrimoine",
    description: "Analyse financière, rentabilité, optimisation fiscale, stratégies patrimoniales.",
    icon: Calculator,
    color: "from-emerald-400 to-teal-400"
  },
  {
    title: "Gestion de Chantier",
    description: "Suivi en temps réel, gestion des documents, budget et coordination des acteurs.",
    icon: Hammer,
    color: "from-orange-400 to-amber-400"
  },
  {
    title: "Marketplace Intégrée",
    description: "Mise en relation entre professionnels, artisans, fournisseurs et investisseurs.",
    icon: Factory,
    color: "from-purple-400 to-violet-400"
  }
];

const userTypes = [
  {
    title: "Promoteurs & Investisseurs",
    description: "Trouvez des opportunités, montez vos opérations et optimisez vos financements.",
    icon: Wallet,
    color: "from-blue-400 to-indigo-400"
  },
  {
    title: "Maîtres d'Œuvre",
    description: "Accédez aux appels d'offres, proposez vos services et automatisez vos process.",
    icon: Hammer,
    color: "from-emerald-400 to-teal-400"
  },
  {
    title: "Agents Immobiliers",
    description: "Gérez vos mandats, suivez vos prospects et optimisez vos ventes.",
    icon: HomeIcon,
    color: "from-purple-400 to-violet-400"
  },
  {
    title: "Entreprises & Fournisseurs",
    description: "Développez votre activité, gérez vos commandes et optimisez votre supply chain.",
    icon: Factory,
    color: "from-rose-400 to-pink-400"
  },
  {
    title: "Particuliers",
    description: "Suivez vos actifs, optimisez la gestion locative et accédez à des conseils experts.",
    icon: Users2,
    color: "from-amber-400 to-orange-400"
  }
];

const agentFeatures = [
  {
    title: "Gestion des Mandats",
    description: "Suivi centralisé de tous vos mandats et propriétés",
    icon: ClipboardCheck
  },
  {
    title: "Pipeline Commercial",
    description: "Gestion avancée des prospects et des opportunités",
    icon: TrendingUp
  },
  {
    title: "Marketing Digital",
    description: "Outils de promotion et de diffusion multicanal",
    icon: Search
  },
  {
    title: "Suivi Client",
    description: "CRM intégré spécialisé immobilier",
    icon: UserCheck
  }
];

const supplierFeatures = [
  {
    title: "Gestion des Commandes",
    description: "Suivi en temps réel des commandes et livraisons",
    icon: Package
  },
  {
    title: "Supply Chain",
    description: "Optimisation des stocks et de la logistique",
    icon: Truck
  },
  {
    title: "Marketplace B2B",
    description: "Place de marché dédiée aux professionnels",
    icon: ShoppingBag
  },
  {
    title: "Outils Métier",
    description: "Solutions spécialisées par corps de métier",
    icon: Wrench
  }
];

const aiFeatures = [
  {
    title: "Analyse Réglementaire & PLU",
    description: "Vérification instantanée des contraintes urbaines et opportunités foncières.",
    icon: Shield
  },
  {
    title: "Simulation Financière",
    description: "Comparaison automatique des régimes fiscaux et projections patrimoniales.",
    icon: PieChart
  },
  {
    title: "Optimisation des Chantiers",
    description: "Détection des surcoûts, planning dynamique et prévision des aléas.",
    icon: Target
  }
];

const managementFeatures = [
  {
    title: "Suivi des Travaux",
    description: "Reporting automatique et tableaux de bord en temps réel",
    icon: BarChart2
  },
  {
    title: "Gestion Documentaire",
    description: "CCTP, DPGF, conformité RE2020 et plus",
    icon: FileText
  },
  {
    title: "Budget & Facturation",
    description: "Suivi des coûts et prévisions financières",
    icon: Calculator
  },
  {
    title: "Collaboration Centralisée",
    description: "Communication unifiée entre tous les intervenants",
    icon: Users2
  }
];

export function Landing() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))]">
      <Navigation />
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-transparent bg-clip-text">
              L'Écosystème 360° pour la Construction et l'Investissement
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto">
              Une plateforme SaaS tout-en-un qui connecte et optimise l'ensemble de l'écosystème immobilier, 
              de la conception à l'exploitation.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartClick}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
                  text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 
                  transition-all duration-300 hover:scale-105"
              >
                Commencer gratuitement
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-[rgb(var(--border))]
                  text-[rgb(var(--foreground))] font-medium hover:bg-[rgb(var(--accent))]
                  transition-all duration-300"
              >
                Demander une démo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Solution Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))]">
              NOTRE SOLUTION
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))]">
              Plus de 60 outils métiers et spécialisés pour l'ensemble de l'écosystème immobilier
            </p>
          </div>

          <div className="relative">
            {/* Central Hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 
              flex items-center justify-center z-20 shadow-xl shadow-blue-500/20">
              <div className="text-center text-white">
                <Cpu className="w-10 h-10 mx-auto mb-2" />
                <span className="text-lg font-medium">SaaS 360</span>
              </div>
            </div>

            {/* Connection Lines */}
            <div className="absolute inset-0 z-10">
              <svg className="w-full h-full" viewBox="0 0 800 800">
                {/* Top connection */}
                <path 
                  d="M400,400 L400,200"
                  className="stroke-[rgb(var(--primary))] stroke-2 opacity-20"
                  fill="none"
                />
                {/* Left connection */}
                <path 
                  d="M400,400 L200,400"
                  className="stroke-[rgb(var(--primary))] stroke-2 opacity-20"
                  fill="none"
                />
                {/* Right connection */}
                <path 
                  d="M400,400 L600,400"
                  className="stroke-[rgb(var(--primary))] stroke-2 opacity-20"
                  fill="none"
                />
                {/* Bottom-left connection */}
                <path 
                  d="M400,400 L300,600"
                  className="stroke-[rgb(var(--primary))] stroke-2 opacity-20"
                  fill="none"
                />
                {/* Bottom-right connection */}
                <path 
                  d="M400,400 L500,600"
                  className="stroke-[rgb(var(--primary))] stroke-2 opacity-20"
                  fill="none"
                />
              </svg>
            </div>

            {/* Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
              {/* Top module */}
              <div className="col-span-1 md:col-start-2">
                <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
                  <HardHat className="w-8 h-8 text-[rgb(var(--primary))] mb-4" />
                  <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                    Maîtrise d'œuvre
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    Gestion de projet, suivi budgétaire, réglementations
                  </p>
                </div>
              </div>

              {/* Middle row */}
              <div className="col-span-1 md:col-start-1 md:mt-16">
                <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-[rgb(var(--primary))] mb-4" />
                  <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                    Maîtrise d'ouvrage
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    Gestion de patrimoine, régulations, audits
                  </p>
                </div>
              </div>
              <div className="col-span-1 md:col-start-3 md:mt-16">
                <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
                  <Factory className="w-8 h-8 text-[rgb(var(--primary))] mb-4" />
                  <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                    Entreprises et fournisseurs
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    Appels d'offres, marketplace, supply chain
                  </p>
                </div>
              </div>

              {/* Bottom row */}
              <div className="col-span-1 md:col-start-1 md:mt-16">
                <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
                  <HomeIcon className="w-8 h-8 text-[rgb(var(--primary))] mb-4" />
                  <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                    Professionnels de l'immobilier
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    Transactions, suivi des ventes
                  </p>
                </div>
              </div>
              <div className="col-span-1 md:col-start-3 md:mt-16">
                <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
                  <Users2 className="w-8 h-8 text-[rgb(var(--primary))] mb-4" />
                  <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                    Clients particuliers
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    Interface de suivi, paiements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-[rgb(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))]">
              Un SaaS Complet pour Tout l'Immobilier & la Construction
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))]">
              Novaesta regroupe toutes les étapes d'un projet immobilier et BTP en un seul endroit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} 
                  flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-20 bg-[rgb(var(--accent))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))]">
              Une Marketplace Intégrée pour Tous les Acteurs du Marché
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))]">
              Novaesta facilite la collaboration entre tous les professionnels de l'immobilier et du BTP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type) => (
              <div key={type.title} className="glass-panel p-8 hover:scale-105 transition-transform duration-300">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} 
                  flex items-center justify-center mb-6`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4">
                  {type.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))]">
                  {type.description}
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-[rgb(var(--foreground))]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
                    Accès aux outils spécialisés
                  </li>
                  <li className="flex items-center text-[rgb(var(--foreground))]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
                    Réseau professionnel qualifié
                  </li>
                  <li className="flex items-center text-[rgb(var(--foreground))]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
                    Support dédié
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Immobiliers Section */}
      <section className="py-20 bg-[rgb(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 
              text-purple-400 font-medium mb-6">
              <HomeIcon className="w-5 h-5 mr-2" />
              Agents Immobiliers
            </div>
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))]">
              Solutions Dédiées aux Professionnels de l'Immobilier
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))]">
              Optimisez votre activité et développez votre portefeuille clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agentFeatures.map((feature) => (
              <div key={feature.title} className="glass-panel p-6">
                <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entreprises et Fournisseurs Section */}
      <section className="py-20 bg-[rgb(var(--accent))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-500/10 
              text-rose-400 font-medium mb-6">
              <Factory className="w-5 h-5 mr-2" />
              Entreprises & Fournisseurs
            </div>
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))]">
              Plateforme B2B pour les Professionnels du BTP
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))]">
              Gérez efficacement vos commandes et optimisez votre chaîne d'approvisionnement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supplierFeatures.map((feature) => (
              <div key={feature.title} className="glass-panel p-6">
                <feature.icon className="w-8 h-8 text-rose-400 mb-4" />
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 bg-[rgb(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 
              text-blue-400 font-medium mb-6">
              <Brain className="w-5 h-5 mr-2" />
              Intelligence Artificielle
            </div>
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))]">
              L'Intelligence Artificielle au Service de l'Immobilier
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))]">
              Novaesta intègre une IA avancée pour optimiser chaque étape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiFeatures.map((feature) => (
              <div key={feature.title} className="glass-panel p-6">
                <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Features */}
      <section className="py-20 bg-[rgb(var(--accent))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))]">
              Un Système de Gestion Tout-en-Un
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--muted-foreground))]">
              Un tableau de bord unique pour piloter tous les projets immobiliers et chantiers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {managementFeatures.map((feature) => (
              <div key={feature.title} className="glass-panel p-6">
                <feature.icon className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[rgb(var(--background))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
            <div className="relative">
              <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-4">
                Rejoignez Novaesta, L'Écosystème de Référence
              </h2>
              <p className="text-lg text-[rgb(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
                Boostez votre productivité, sécurisez vos investissements et simplifiez la gestion de vos actifs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartClick}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r 
                    from-cyan-500 to-blue-500 text-white font-medium shadow-lg 
                    shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Essayer gratuitement
                  <Zap className="ml-2 w-5 h-5" />
                </button>
                <Link
                  to="/pricing"
                  className="inline-flex items-center px-6 py-3 rounded-lg border 
                    border-[rgb(var(--border))] text-[rgb(var(--foreground))] 
                    font-medium hover:bg-[rgb(var(--accent))] transition-all duration-300"
                >
                  Voir les tarifs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}