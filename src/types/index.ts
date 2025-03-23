export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'user';
  subscription_tier: 'free_trial' | 'starter' | 'business' | 'premium' | null;
  trial_start_date: string | null;
  trial_end_date: string | null;
  professional_role: 
    | 'architecte'
    | 'ingenieur'
    | 'maitre_oeuvre'
    | 'maitre_ouvrage'
    | 'entrepreneur'
    | 'artisan'
    | 'promoteur'
    | 'investisseur'
    | 'agent_immobilier'
    | 'expert_technique'
    | 'consultant'
    | 'other';
  industry_focus: string[];
  expertise_level: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  interests: string[];
  preferred_learning_style: 'visuel' | 'auditif' | 'pratique' | 'theorique' | 'mixte';
  communication_preferences: {
    language: string;
    format: 'concise' | 'detailed';
    style: 'casual' | 'professional';
    notifications: {
      email: boolean;
      inApp: boolean;
      desktop: boolean;
    };
  };
  ai_preferences: {
    responseStyle: 'concise' | 'detailed';
    technicalLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
    includeExamples: boolean;
    includeSources: boolean;
    autoSuggestions: boolean;
    preferredTopics: string[];
    excludedTopics: string[];
  };
}

export interface Project {
  id: string;
  name: string;
  location: string;
  budget: number;
  progress: number;
  manager_id: string;
  status: 'active' | 'pending' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  importance: 'high' | 'medium' | 'low';
  icon: string;
  created_at: string;
}

export interface KPI {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}

export interface SubscriptionFeature {
  name: string;
  description: string;
  tiers: {
    starter: boolean;
    business: boolean;
    premium: boolean;
  };
}

export interface SubscriptionTier {
  id: 'starter' | 'business' | 'premium';
  name: string;
  price: number;
  description: string;
  maxUsers: number;
  features: string[];
}