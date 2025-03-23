import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface SubscriptionContextType {
  isTrialing: boolean;
  trialDaysLeft: number | null;
  currentTier: string | null;
  loading: boolean;
  error: string | null;
  isFeatureAvailable: (featureName: string) => boolean;
  toggleFeature: (featureName: string) => Promise<boolean>;
  activeFeatures: string[];
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const FEATURE_TIERS = {
  module_maitre_oeuvre: ['business', 'premium'],
  module_maitre_ouvrage: ['business', 'premium'],
  module_entreprise: ['premium'],
  module_particuliers: ['business', 'premium'],
  module_agents: ['premium'],
} as const;

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [trialEndDate, setTrialEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSubscriptionData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user's profile with subscription info
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('subscription_tier, trial_end_date')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profile) {
          setCurrentTier(profile.subscription_tier);
          setTrialEndDate(profile.trial_end_date);
        }

        // Get user's active features
        const { data: features, error: featuresError } = await supabase
          .from('user_features')
          .select('feature_name, enabled')
          .eq('user_id', user.id);

        if (featuresError) throw featuresError;

        if (features) {
          setActiveFeatures(features.filter(f => f.enabled).map(f => f.feature_name));
        }

      } catch (err) {
        console.error('Error fetching subscription data:', err);
        setError('Failed to load subscription information');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user]);

  const isTrialing = Boolean(
    currentTier === 'free_trial' && 
    trialEndDate && 
    new Date(trialEndDate) > new Date()
  );

  const trialDaysLeft = trialEndDate 
    ? Math.max(0, Math.ceil((new Date(trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  const isFeatureAvailable = (featureName: string): boolean => {
    // During trial period, all features are available
    if (isTrialing) return true;

    // Check if user's subscription tier allows the feature
    const allowedTiers = FEATURE_TIERS[featureName as keyof typeof FEATURE_TIERS];
    if (!allowedTiers) return false;

    return allowedTiers.includes(currentTier as string);
  };

  const toggleFeature = async (featureName: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Check if user's subscription allows this feature
      const allowedTiers = FEATURE_TIERS[featureName as keyof typeof FEATURE_TIERS];
      if (!allowedTiers?.includes(currentTier as string) && !isTrialing) {
        return false;
      }

      const isCurrentlyActive = activeFeatures.includes(featureName);
      const newEnabledState = !isCurrentlyActive;

      // Update feature status in database
      const { error } = await supabase
        .from('user_features')
        .upsert({
          user_id: user.id,
          feature_name: featureName,
          enabled: newEnabledState
        }, {
          onConflict: 'user_id,feature_name'
        });

      if (error) throw error;

      // Update local state
      setActiveFeatures(prev => 
        newEnabledState
          ? [...prev, featureName]
          : prev.filter(f => f !== featureName)
      );

      return true;
    } catch (err) {
      console.error('Error toggling feature:', err);
      return false;
    }
  };

  const value = {
    isTrialing,
    trialDaysLeft,
    currentTier,
    loading,
    error,
    isFeatureAvailable,
    toggleFeature,
    activeFeatures
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}