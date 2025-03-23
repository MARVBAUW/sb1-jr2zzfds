import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronLeft } from 'lucide-react';
import { ProfileSelection } from './ProfileSelection';
import { ProjectForm } from './ProjectForm';
import { ProjectSwiper } from './ProjectSwiper';
import { VentureNavigation } from './Navigation';

type UserProfile = 'investor' | 'creator' | null;

export function Venture() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile>(null);
  const [loading, setLoading] = useState(true);
  const [hasSubmittedProject, setHasSubmittedProject] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Load user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('venture_profile')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (profileData?.venture_profile) {
          setUserProfile(profileData.venture_profile as UserProfile);

          // Check if user has already submitted a project
          if (profileData.venture_profile === 'creator') {
            const { data: projectData, error: projectError } = await supabase
              .from('venture_projects')
              .select('id')
              .eq('user_id', user.id)
              .limit(1)
              .maybeSingle();

            if (projectError) throw projectError;
            setHasSubmittedProject(!!projectData);
          }
        }
      } catch (err) {
        console.error('Error loading user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  const handleProfileSelect = async (profile: UserProfile) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ venture_profile: profile })
        .eq('id', user.id);

      if (error) throw error;

      setUserProfile(profile);

      // Redirect investors directly to swipe page
      if (profile === 'investor') {
        navigate('/venture/swipe', { replace: true });
      } else if (profile === 'creator') {
        navigate('/venture/project/new', { replace: true });
      }
    } catch (err) {
      console.error('Error saving user profile:', err);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-800">
        <div className="glass-panel p-8 flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-emerald-400 text-lg">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-800 relative">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button
          onClick={handleBack}
          className="fixed top-6 left-6 p-2 rounded-lg bg-dark-700/80 backdrop-blur-sm border border-gray-700/50 
            text-gray-400 hover:text-gray-300 hover:border-gray-600/50 transition-all duration-200
            hover:bg-dark-600/80 z-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="pt-24 pb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text text-center">
            Novaesta Venture
          </h1>
          <p className="mt-2 text-gray-400 text-center max-w-2xl mx-auto">
            {!userProfile 
              ? "Rejoignez l'écosystème d'innovation et d'investissement dans l'immobilier durable"
              : userProfile === 'creator'
              ? "Présentez votre projet innovant à notre communauté d'investisseurs"
              : "Découvrez et investissez dans des projets immobiliers innovants et durables"
            }
          </p>
        </div>

        <VentureNavigation />

        <div className="py-8">
          <Routes>
            <Route index element={!userProfile ? <ProfileSelection onSelect={handleProfileSelect} /> : <ProjectSwiper />} />
            <Route path="swipe" element={<ProjectSwiper />} />
            <Route 
              path="project/new" 
              element={
                <ProjectForm 
                  onSubmitSuccess={() => {
                    setHasSubmittedProject(true);
                    navigate('/venture/swipe', { replace: true });
                  }}
                />
              } 
            />
          </Routes>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
    </div>
  );
}