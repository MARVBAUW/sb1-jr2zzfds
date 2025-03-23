import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { SocialAuth } from '../components/SocialAuth';
import { supabase } from '../lib/supabase';

const signUpSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      signUpSchema.parse(formData);
      
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) throw signUpError;

      if (user) {
        navigate('/signin', { 
          state: { 
            message: 'Compte créé avec succès. Vous pouvez maintenant vous connecter.' 
          } 
        });
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
          auth: error.message || 'Une erreur est survenue lors de la création du compte.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Commencez votre expérience avec Novaesta"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.auth && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {errors.auth}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="vous@exemple.fr"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          disabled={isLoading}
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          disabled={isLoading}
        />
        <Input
          label="Confirmer le mot de passe"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary bg-gradient-to-r from-cyan-500 to-blue-600 
            hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Création...' : 'Créer un compte'}
        </button>

        <SocialAuth />

        <p className="text-center text-sm text-gray-400">
          Déjà un compte ?{' '}
          <Link
            to="/signin"
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}