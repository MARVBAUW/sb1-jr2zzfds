import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Logo() {
  const navigate = useNavigate();

  return (
    <div 
      className="relative group cursor-pointer"
      onClick={() => navigate('/')}
    >
      {/* Main circular logo container */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center 
        bg-gradient-to-br from-gray-700/50 to-gray-900/50 
        border border-gray-600/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
        {/* Logo text with enhanced metallic gradient */}
        <span className="text-2xl font-light tracking-[0.2em] transform group-hover:scale-105 
          transition-transform duration-300 bg-clip-text text-transparent
          bg-[linear-gradient(135deg,#ffffff_0%,#a1a1a1_25%,#ffffff_50%,#a1a1a1_75%,#ffffff_100%)]
          [-webkit-text-stroke:0.5px_rgba(255,255,255,0.2)]
          select-none">
          NE
        </span>
      </div>

      {/* Enhanced metallic reflection effect */}
      <div className="absolute inset-0 rounded-full opacity-60
        bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)]
        animate-reflection" />

      {/* Enhanced glow on hover */}
      <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-40 
        transition-opacity duration-300 blur-sm
        bg-gradient-to-r from-white via-gray-300 to-transparent" />
    </div>
  );
}