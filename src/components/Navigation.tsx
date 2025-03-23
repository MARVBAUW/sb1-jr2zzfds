import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Navigation() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleStartClick = () => {
    navigate('/signup');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--background))]/80 backdrop-blur-xl border-b border-[rgb(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-4">
            <Logo />
            <span className="text-xl font-bold tracking-[0.15em] bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text font-['Orbitron']">
              NOVAESTA
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[rgb(var(--hover))] transition-colors duration-200"
              title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-amber-400" />
              )}
            </button>
            
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
              <button
                onClick={handleStartClick}
                className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
                  text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 
                  transition-all duration-300"
              >
                Commencer gratuitement
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}