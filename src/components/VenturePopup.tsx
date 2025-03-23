import React from 'react';
import { Leaf, Coins, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PopupBase } from './PopupBase';

export function VenturePopup({ onExpand, isStacked, stackIndex }: {
  onExpand?: (expanded: boolean) => void;
  isStacked?: boolean;
  stackIndex?: number;
}) {
  const navigate = useNavigate();

  const handleVentureClick = () => {
    if (onExpand) {
      onExpand(false); // Ferme le popup
    }
    navigate('/venture');
  };

  return (
    <PopupBase
      title="Novaesta Venture"
      icon={<Leaf className="w-5 h-5" />}
      iconColor="#10B981"
      onExpand={onExpand}
      isStacked={isStacked}
      stackIndex={stackIndex}
      allowMinimize={true}
    >
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-300 leading-relaxed">
          Participez au financement de projets innovants et écologiques dans l'immobilier. 
          Chaque année, un projet est sélectionné et financé par la communauté Novaesta.
        </p>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-dark-700/30 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm text-emerald-400 font-medium">Actionnariat NOVX</h3>
            </div>
            <p className="text-xs text-gray-400">
              Recevez des tokens NOVX proportionnels à votre activité sur la plateforme.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-dark-700/30 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm text-blue-400 font-medium">Impact & Rentabilité</h3>
            </div>
            <p className="text-xs text-gray-400">
              Investissez dans des projets à fort potentiel combinant rentabilité et impact.
            </p>
          </div>
        </div>

        <button
          onClick={handleVentureClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
            bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium 
            shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300"
        >
          Découvrir les projets
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </PopupBase>
  );
}