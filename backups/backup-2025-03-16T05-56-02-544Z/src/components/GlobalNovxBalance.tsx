import React, { useState, useRef } from 'react';
import { Coins } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';
import Draggable from 'react-draggable';

export function GlobalNovxBalance() {
  const { novxBalance, loading } = useFinance();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  if (loading) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      bounds="parent"
      handle=".handle"
    >
      <div 
        ref={nodeRef} 
        className="fixed left-1/2 top-4 -translate-x-1/2 z-50"
        style={{ transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)` }}
      >
        <div className="flex items-center gap-1.5 bg-dark-700/50 backdrop-blur-sm border border-amber-500/20 
          rounded-full px-3 py-1.5 hover:bg-dark-700/70 transition-colors duration-200 handle cursor-move 
          shadow-lg hover:shadow-xl">
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-400">{novxBalance} NOVX</span>
        </div>
      </div>
    </Draggable>
  );
}