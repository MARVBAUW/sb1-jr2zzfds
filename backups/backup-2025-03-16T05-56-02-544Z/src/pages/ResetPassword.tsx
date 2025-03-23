import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { supabase } from '../lib/supabase';

const resetPasswordSchema = z.object({
  email: z.string().email('Email invalide'),
});

const updatePasswordSchema = z.object({
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Parse both URL parameters and hash parameters
  const getUrlParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    const hashParams = new URLSearchParams(location.hash.replace('#', ''));
    
    return {
      token: params.get('token') || hashParams.get('token'),
      error: params.get('error') || hashParams.get('error'),
      errorCode: params.get('error_code') || hashParams.get('error_code'),
      errorDescription: params.get('error_description') || hashParams.get('error_description')
    };
  };

  const { token, error, errorCode, errorDescription } = getUrlParams();

  // Handle error parameters
  useEffect(() => {
    if (error || errorCode) {
      setMessage({
        type: 'error',
        text: errorDescription 
          ? decodeURIComponent(errorDescription).replace(/\+/g, ' ')
          : 'Le lien de réinitialisation est invalide ou a expiré. Veuillez faire une nouvelle demande.'
      });

      // Clean up URL after displaying error
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);

      // Redirect to reset password request after a delay
      setTimeout(() => {
        navigate('/reset-password', { replace: true });
      }, 3000);
    }
  }, [error, errorCode, errorDescription, navigate]);

  // Check if we're in update password mode
  const isUpdateMode = !!token;

  useEffect(() => {
    // If we have a token and no error, verify it
    if (token && !error) {
      const verifyToken = async () => {
        try {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token,
            type: 'recovery'
          });

          if (verifyError) {
            setMessage({
              type: 'error',
              text: 'Le lien de réinitialisation est invalide ou a expiré. Veuillez faire une nouvelle demande.'
            });
            // Redirect to reset password request after a delay
            setTimeout(() => {
              navigate('/reset-password', { replace: true });
            }, 3000);
          }
        } catch (error) {
          setMessage({
            type: 'error',
            text: 'Une erreur est survenue lors de la vérification du lien.'
          });
        }
      };

      verifyToken();
    }
  }, [token, error, navigate]);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);
    setIsLoading(true);

    try {
      resetPasswordSchema.parse({ email });

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      setMessage({
        type: 'success',
        text: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.'
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setMessage({
          type: 'error',
          text: 'Une erreur est survenue. Veuillez réessayer.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);
    setIsLoading(true);

    try {
      updatePasswordSchema.parse({ password, confirmPassword });

      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setMessage({
        type: 'success',
        text: 'Mot de passe mis à jour avec succès.'
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/signin', {
          state: { message: 'Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter.' },
          replace: true
        });
      }, 2000);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setMessage({
          type: 'error',
          text: 'Une erreur est survenue lors de la mise à jour du mot de passe.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={isUpdateMode ? 'Nouveau mot de passe' : 'Réinitialiser le mot de passe'}
      subtitle={
        isUpdateMode
          ? 'Choisissez votre nouveau mot de passe'
          : 'Entrez votre email pour réinitialiser votre mot de passe'
      }
    >
      {message && (
        <div
          className={`p-3 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          } text-sm mb-6`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={isUpdateMode ? handleUpdatePassword : handleResetRequest} className="space-y-6">
        {!isUpdateMode ? (
          <Input
            label="Email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="vous@exemple.fr"
            disabled={isLoading}
            required
            autoComplete="email"
          />
        ) : (
          <>
            <Input
              label="Nouveau mot de passe"
              type="password"
              name="new-password"
              id="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              disabled={isLoading}
              required
              autoComplete="new-password"
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              name="confirm-password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              placeholder="••••••••"
              disabled={isLoading}
              required
              autoComplete="new-password"
            />
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r 
            from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 
            focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 
            disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading
            ? 'Chargement...'
            : isUpdateMode
            ? 'Mettre à jour le mot de passe'
            : 'Envoyer le lien de réinitialisation'}
        </button>

        <p className="text-center text-sm text-gray-400">
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            Retour à la connexion
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}