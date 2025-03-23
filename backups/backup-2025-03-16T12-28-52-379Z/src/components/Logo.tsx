import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Logo() {
  const navigate = useNavigate();

  return (
    <div 
      className="relative group cursor-pointer"
      onClick={() => navigate('/')}
    >
      {/* Thin ring container */}
      <div className="w-14 h-14 rounded-full flex items-center justify-center 
        border border-gray-700/40 relative">
        {/* Logo text with metallic effect - increased pl-1 for more right shift */}
        <div className="text-2xl font-light tracking-[0.2em] transform group-hover:scale-105 
          transition-all duration-300 bg-clip-text text-transparent
          bg-[linear-gradient(135deg,#ffffff_0%,#e0e0e0_25%,#ffffff_50%,#e0e0e0_75%,#ffffff_100%)]
          [-webkit-text-stroke:0.5px_rgba(255,255,255,0.15)]
          select-none font-['Orbitron'] relative z-10 flex items-center justify-center
          h-full w-full pb-0.5 pl-1">
          NE
        </div>

        {/* Inner ring glow */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
      </div>

      {/* Subtle reflection effect */}
      <div className="absolute inset-0 rounded-full opacity-40
        bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.2)_50%,transparent_60%)]
        animate-reflection" />

      {/* Minimal glow on hover */}
      <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-30 
        transition-opacity duration-300 blur-md
        bg-gradient-to-r from-cyan-400/30 via-white/10 to-transparent" />

      {/* Ultra-subtle ring highlight */}
      <div className="absolute inset-0 rounded-full border border-white/5" />
    </div>
  );
}