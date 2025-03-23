import React from 'react';
import { DashboardStats } from './DashboardStats';
import type { KPI } from '../types';

interface ModuleKPIsProps {
  module: 'agents' | 'maitreOeuvre' | 'maitreOuvrage' | 'entreprise' | 'particuliers';
  section?: string;
}

const moduleKPIs: Record<ModuleKPIsProps['module'], Record<string, KPI[]>> = {
  agents: {
    default: [
      { label: 'Mandats actifs', value: 24, change: 20, trend: 'up' },
      { label: 'Visites/semaine', value: 15, change: 25, trend: 'up' },
      { label: 'Taux conversion', value: 4.2, change: 0.5, trend: 'up' },
      { label: 'CA mensuel', value: 28000, change: 12, trend: 'up' }
    ],
    mandats: [
      { label: 'Mandats exclusifs', value: 12, change: 33, trend: 'up' },
      { label: 'Prix moyen', value: 320000, change: 15, trend: 'up' },
      { label: 'Durée moyenne', value: 85, change: 10, trend: 'down' },
      { label: 'Taux négociation', value: 4.5, change: 0.8, trend: 'up' }
    ],
    clients: [
      { label: 'Prospects actifs', value: 45, change: 28, trend: 'up' },
      { label: 'Taux qualification', value: 65, change: 12, trend: 'up' },
      { label: 'Contacts/jour', value: 12, change: 20, trend: 'up' },
      { label: 'Satisfaction', value: 92, change: 5, trend: 'up' }
    ],
    activite: [
      { label: 'RDV semaine', value: 18, change: 15, trend: 'up' },
      { label: 'Visites réalisées', value: 8, change: 33, trend: 'up' },
      { label: 'Offres en cours', value: 5, change: 25, trend: 'up' },
      { label: 'Compromis', value: 2, change: 100, trend: 'up' }
    ]
  },
  maitreOeuvre: {
    default: [
      { label: 'Projets en cours', value: 15, change: 20, trend: 'up' },
      { label: 'En phase travaux', value: 8, change: 14, trend: 'up' },
      { label: 'En phase études', value: 7, change: 27, trend: 'up' },
      { label: 'Appels d\'offres', value: 4, change: 33, trend: 'up' }
    ],
    analyses: [
      { label: 'Performance budgétaire', value: 92, change: 5, trend: 'up' },
      { label: 'Taux de rentabilité', value: 24, change: 12, trend: 'up' },
      { label: 'Délais respectés', value: 88, change: 3, trend: 'down' },
      { label: 'Optimisations IA', value: 15, change: 40, trend: 'up' }
    ],
    outils: [
      { label: 'Documents générés', value: 145, change: 25, trend: 'up' },
      { label: 'Études RE2020', value: 8, change: 60, trend: 'up' },
      { label: 'Calculs techniques', value: 34, change: 15, trend: 'up' },
      { label: 'Normes mises à jour', value: 12, change: 9, trend: 'up' }
    ],
    chantier: [
      { label: 'Chantiers actifs', value: 8, change: 14, trend: 'up' },
      { label: 'Taux d\'avancement', value: 65, change: 12, trend: 'up' },
      { label: 'Plans mis à jour', value: 23, change: 28, trend: 'up' },
      { label: 'Réserves levées', value: 45, change: 30, trend: 'up' }
    ]
  },
  maitreOuvrage: {
    default: [
      { label: 'Actifs gérés', value: 18, change: 12, trend: 'up' },
      { label: 'Valeur portfolio', value: 4500000, change: 15, trend: 'up' },
      { label: 'Rendement moyen', value: 6.8, change: 0.5, trend: 'up' },
      { label: 'Taux occupation', value: 95, change: 2, trend: 'up' }
    ],
    patrimoine: [
      { label: 'Biens locatifs', value: 12, change: 20, trend: 'up' },
      { label: 'Surface totale', value: 1250, change: 15, trend: 'up' },
      { label: 'Loyers perçus', value: 28000, change: 8, trend: 'up' },
      { label: 'Charges', value: 4500, change: 5, trend: 'down' }
    ],
    investissements: [
      { label: 'Projets actifs', value: 3, change: 50, trend: 'up' },
      { label: 'ROI moyen', value: 12.5, change: 1.5, trend: 'up' },
      { label: 'Montant investi', value: 850000, change: 40, trend: 'up' },
      { label: 'Plus-values', value: 125000, change: 25, trend: 'up' }
    ]
  },
  entreprise: {
    default: [
      { label: 'Commandes', value: 45, change: 20, trend: 'up' },
      { label: 'CA mensuel', value: 180000, change: 15, trend: 'up' },
      { label: 'Marge brute', value: 22.5, change: 1.2, trend: 'up' },
      { label: 'Stock', value: 85000, change: 5, trend: 'down' }
    ],
    'supply-chain': [
      { label: 'Fournisseurs', value: 28, change: 12, trend: 'up' },
      { label: 'Délai moyen', value: 12, change: 15, trend: 'down' },
      { label: 'Taux service', value: 96, change: 3, trend: 'up' },
      { label: 'Stock sécurité', value: 45000, change: 8, trend: 'up' }
    ],
    production: [
      { label: 'Productivité', value: 92, change: 5, trend: 'up' },
      { label: 'Taux qualité', value: 98.5, change: 0.8, trend: 'up' },
      { label: 'Maintenance', value: 4.2, change: 12, trend: 'down' },
      { label: 'Utilisation', value: 85, change: 3, trend: 'up' }
    ],
    commercial: [
      { label: 'Devis envoyés', value: 65, change: 28, trend: 'up' },
      { label: 'Taux conversion', value: 35, change: 5, trend: 'up' },
      { label: 'Panier moyen', value: 4200, change: 12, trend: 'up' },
      { label: 'Clients actifs', value: 120, change: 15, trend: 'up' }
    ]
  },
  particuliers: {
    default: [
      { label: 'Biens', value: 3, change: 50, trend: 'up' },
      { label: 'Valeur totale', value: 750000, change: 15, trend: 'up' },
      { label: 'Revenus locatifs', value: 2800, change: 12, trend: 'up' },
      { label: 'Rendement', value: 4.8, change: 0.3, trend: 'up' }
    ],
    patrimoine: [
      { label: 'Surface totale', value: 180, change: 20, trend: 'up' },
      { label: 'Charges/mois', value: 450, change: 5, trend: 'down' },
      { label: 'Taux occupation', value: 100, change: 0, trend: 'up' },
      { label: 'Plus-value', value: 45000, change: 25, trend: 'up' }
    ],
    location: [
      { label: 'Loyers perçus', value: 2800, change: 12, trend: 'up' },
      { label: 'Impayés', value: 0, change: 100, trend: 'up' },
      { label: 'Interventions', value: 2, change: 50, trend: 'down' },
      { label: 'Satisfaction', value: 4.8, change: 0.2, trend: 'up' }
    ],
    documents: [
      { label: 'Contrats actifs', value: 5, change: 25, trend: 'up' },
      { label: 'Documents', value: 45, change: 15, trend: 'up' },
      { label: 'Échéances', value: 3, change: 0, trend: 'up' },
      { label: 'Alertes', value: 1, change: 50, trend: 'down' }
    ]
  }
};

export function ModuleKPIs({ module, section = 'default' }: ModuleKPIsProps) {
  const stats = moduleKPIs[module][section] || moduleKPIs[module].default;
  return <DashboardStats stats={stats} />;
}