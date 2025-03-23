import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { SocialAuth } from '../components/SocialAuth';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const signInSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const ERROR_MESSAGES = {
  'Invalid login credentials': 'Email ou mot de passe incorrect',
  'Email not confirmed': 'Veuillez confirmer votre email avant de vous connecter',
  'Invalid email format': 'Format d\'email invalide',
  'Password is too short': 'Le mot de passe doit contenir au moins 6 caractères',
  'Too many requests': 'Trop de tentatives de connexion. Veuillez réessayer plus tard',
  'Network error': 'Erreur de connexion. Veuillez vérifier votre connexion internet',
  'default': 'Une erreur est survenue. Veuillez réessayer'
};

export function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, refreshSession } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (user) {
      // Redirect to dashboard instead of the landing page
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const getErrorMessage = (error: Error): string => {
    const message = error.message;
    return ERROR_MESSAGES[message as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.default;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      signInSchema.parse(formData);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
        options: {
          shouldRememberSession: rememberMe
        }
      });

      if (error) throw error;
      
      if (data.user) {
        await refreshSession();
        // Redirect to dashboard after successful login
        navigate('/dashboard', { replace: true });
      }
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
        setErrors({
          auth: getErrorMessage(error)
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Connectez-vous à votre compte Novaesta"
    >
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {location.state?.message && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {location.state.message}
            </div>
          )}

          {errors.auth && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {errors.auth}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="vous@exemple.fr"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              disabled={isLoading}
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-dark-400/30 bg-dark-700/50 text-cyan-500 
                  focus:ring-2 focus:ring-cyan-500/20 focus:ring-offset-0 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-400 select-none">Se souvenir de moi</span>
            </label>
            <Link
              to="/reset-password"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r 
              from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 
              focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 
              disabled:cursor-not-allowed transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>

          <SocialAuth />

          <p className="text-center text-sm text-gray-400">
            Pas encore de compte ?{' '}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}