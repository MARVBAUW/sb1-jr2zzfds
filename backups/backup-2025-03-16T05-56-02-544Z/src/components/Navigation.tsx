import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ChevronRight } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--background))]/80 backdrop-blur-xl border-b border-[rgb(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-4">
            <Logo />
            <span className="text-xl font-bold tracking-[0.15em] bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              NOVAESTA
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/pricing"
              className="text-sm text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors"
            >
              Tarifs
            </Link>
            <div className="flex items-center gap-2">
              <Link
                to="/signin"
                className="text-sm text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors flex items-center gap-1"
              >
                Connexion
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
                  text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 
                  transition-all duration-300"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}