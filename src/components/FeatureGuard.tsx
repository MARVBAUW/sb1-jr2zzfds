import React from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface FeatureGuardProps {
  featureName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureGuard({ featureName, children, fallback }: FeatureGuardProps) {
  const { isFeatureAvailable, isTrialing, trialDaysLeft } = useSubscription();

  if (isFeatureAvailable(featureName)) {
    return <>{children}</>;
  }

  const defaultFallback = (
    <div className="p-6 text-center">
      <div className="mb-4">
        <Lock className="w-12 h-12 mx-auto text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-200 mb-2">
        Fonctionnalité Premium
      </h3>
      <p className="text-gray-400 mb-4">
        Cette fonctionnalité nécessite un abonnement supérieur
      </p>
      <Link
        to="/pricing"
        className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r 
          from-cyan-500 to-blue-500 text-white font-medium shadow-lg 
          shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300"
      >
        Voir les forfaits
      </Link>
    </div>
  );

  return <>{fallback || defaultFallback}</>;
}