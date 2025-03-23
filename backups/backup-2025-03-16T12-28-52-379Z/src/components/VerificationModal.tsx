import React, { useState } from 'react';
import { X, Mail, Check, Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationSuccess: () => void;
  tier: {
    name: string;
    price: number;
  };
}

export function VerificationModal({ isOpen, onClose, onVerificationSuccess, tier }: VerificationModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailSent, setShowEmailSent] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Instead of OTP, we'll use a magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/pricing`,
          data: {
            tier: tier.name,
            price: tier.price
          }
        }
      });

      if (error) throw error;

      setShowEmailSent(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Email verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md">
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[rgb(var(--foreground))]">
              Vérification email
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[rgb(var(--accent))] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {showEmailSent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
                Email envoyé !
              </h4>
              <p className="text-[rgb(var(--muted-foreground))] mb-6">
                Veuillez vérifier votre boîte de réception et cliquer sur le lien pour voir les tarifs.
                Le lien expirera dans 24 heures.
              </p>
              <div className="text-sm text-[rgb(var(--muted-foreground))] p-4 rounded-lg bg-[rgb(var(--accent))] mb-6">
                <strong>Note :</strong> Si vous ne trouvez pas l'email, vérifiez votre dossier spam.
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-[rgb(var(--accent))] 
                  text-[rgb(var(--foreground))] font-medium hover:bg-[rgb(var(--accent))/80] 
                  transition-all duration-300"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted-foreground))]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgb(var(--accent))] 
                      border border-[rgb(var(--border))] focus:outline-none focus:ring-2 
                      focus:ring-[rgb(var(--ring))] transition-all"
                    placeholder="vous@exemple.fr"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
                  text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  'Recevoir le lien de vérification'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}