import React, { useState } from 'react';
import { Coins, Euro } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';
import { PopupBase } from './PopupBase';

const NOVX_TO_EUR_RATE = 20; // Example conversion rate: 1 NOVX = 20 EUR

export function GlobalNovxBalance({ onExpand, isStacked, stackIndex }: {
  onExpand?: (expanded: boolean) => void;
  isStacked?: boolean;
  stackIndex?: number;
}) {
  const { novxBalance, loading } = useFinance();
  const [showEuroValue, setShowEuroValue] = useState(false);

  if (loading) return null;

  const euroValue = novxBalance * NOVX_TO_EUR_RATE;

  return (
    <PopupBase
      title="Balance"
      icon={showEuroValue ? <Euro className="w-5 h-5" /> : <Coins className="w-5 h-5" />}
      iconColor={showEuroValue ? "#0EA5E9" : "#F59E0B"}
      onExpand={onExpand}
      isStacked={isStacked}
      stackIndex={stackIndex}
      allowMinimize={false}
    >
      <div className="p-4 space-y-4">
        <div 
          onClick={() => setShowEuroValue(!showEuroValue)}
          className="p-4 rounded-lg cursor-pointer transition-all duration-200"
          style={{
            background: showEuroValue ? 'rgba(14,165,233,0.1)' : 'rgba(245,158,11,0.1)',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: showEuroValue ? 'rgba(14,165,233,0.2)' : 'rgba(245,158,11,0.2)'
          }}
        >
          <div className="text-2xl font-light mb-1" style={{ color: showEuroValue ? '#0EA5E9' : '#F59E0B' }}>
            {showEuroValue 
              ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(euroValue)
              : `${novxBalance} NOVX`
            }
          </div>
          <div className="text-sm text-gray-400">
            Cliquez pour afficher en {showEuroValue ? 'NOVX' : 'EUR'}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Taux de conversion</span>
            <span className="text-gray-300">1 NOVX = {NOVX_TO_EUR_RATE} EUR</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Dernière mise à jour</span>
            <span className="text-gray-300">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </PopupBase>
  );
}