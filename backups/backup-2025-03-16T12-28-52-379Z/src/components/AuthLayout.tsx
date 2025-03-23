import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ChevronLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-[rgb(var(--background))]">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-6 group">
            <ChevronLeft className="w-4 h-4 text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--foreground))] transition-colors" />
            <span className="text-sm text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--foreground))] transition-colors">
              Retour à l'accueil
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-bold tracking-[0.15em] bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              NOVAESTA
            </span>
          </div>
          <h1 className="mt-6 text-2xl font-light tracking-tight text-[rgb(var(--foreground))]">{title}</h1>
          <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))] tracking-wide">{subtitle}</p>
        </div>
        <div className="glass-panel p-6">
          {children}
        </div>
      </div>
    </div>
  );
}