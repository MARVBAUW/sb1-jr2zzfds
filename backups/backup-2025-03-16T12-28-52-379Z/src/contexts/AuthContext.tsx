import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (session) {
        setSession(session);
        setUser(session.user);
      }
    } catch (err) {
      console.error('Session refresh error:', err);
      setError(err instanceof Error ? err : new Error('Failed to refresh session'));
    }
  };

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        // Vérifier la session actuelle
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }

        // Écouter les changements d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
          if (mounted) {
            setSession(session);
            setUser(session?.user ?? null);
            setError(null);
          }
        });

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('An authentication error occurred'));
          setLoading(false);
        }
      }
    };

    initialize();
  }, []);

  // Rafraîchir automatiquement la session toutes les 10 minutes
  useEffect(() => {
    const interval = setInterval(refreshSession, 600000);
    return () => clearInterval(interval);
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Nettoyer l'état local
      setUser(null);
      setSession(null);
      setError(null);
      
      // Nettoyer le stockage local
      window.localStorage.removeItem('novaesta_auth');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error during sign out'));
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    error,
    signOut,
    refreshSession
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-800">
        <div className="text-cyan-400">Chargement...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}