import React from 'react';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  feature: string;
}

export function ComingSoon({ feature }: ComingSoonProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full 
          bg-cyan-500/10 text-cyan-400">
          <Construction className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 
          text-transparent bg-clip-text mb-3">
          {feature}
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Cette fonctionnalité est en cours de développement. 
          Nous travaillons activement pour la rendre disponible prochainement.
        </p>
      </div>
    </div>
  );
}