import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface NotificationSettings {
  marketplace: {
    newListings: boolean;
    priceChanges: boolean;
    orderUpdates: boolean;
  };
  venture: {
    newProjects: boolean;
    investmentUpdates: boolean;
    milestones: boolean;
  };
  chantier: {
    progress: boolean;
    issues: boolean;
    meetings: boolean;
    documents: boolean;
  };
  popup: {
    ai: boolean;
    venture: boolean;
    balance: boolean;
    customPrompts: string[];
  };
}

interface NotificationContextType {
  settings: NotificationSettings;
  updateSettings: (newSettings: Partial<NotificationSettings>) => Promise<void>;
  addCustomPrompt: (prompt: string) => Promise<void>;
  removeCustomPrompt: (prompt: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const defaultSettings: NotificationSettings = {
  marketplace: {
    newListings: true,
    priceChanges: true,
    orderUpdates: true,
  },
  venture: {
    newProjects: true,
    investmentUpdates: true,
    milestones: true,
  },
  chantier: {
    progress: true,
    issues: true,
    meetings: true,
    documents: true,
  },
  popup: {
    ai: true,
    venture: true,
    balance: true,
    customPrompts: [],
  },
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadSettings = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('user_notification_settings')
          .select('settings')
          .eq('user_id', user.id)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setSettings(data.settings);
        } else {
          // Initialize default settings for new user using upsert
          const { error: insertError } = await supabase
            .from('user_notification_settings')
            .upsert({
              user_id: user.id,
              settings: defaultSettings
            }, {
              onConflict: 'user_id'
            });

          if (insertError) throw insertError;
          setSettings(defaultSettings);
        }
      } catch (err) {
        console.error('Error loading notification settings:', err);
        setError('Failed to load notification settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user]);

  const updateSettings = async (newSettings: Partial<NotificationSettings>) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const updatedSettings = {
        ...settings,
        ...newSettings,
      };

      // Use upsert instead of insert to handle both new and existing records
      const { error: updateError } = await supabase
        .from('user_notification_settings')
        .upsert({
          user_id: user.id,
          settings: updatedSettings
        }, {
          onConflict: 'user_id'
        });

      if (updateError) throw updateError;

      setSettings(updatedSettings);
    } catch (err) {
      console.error('Error updating notification settings:', err);
      setError('Failed to update notification settings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addCustomPrompt = async (prompt: string) => {
    if (!user) return;

    try {
      const updatedPrompts = [...settings.popup.customPrompts, prompt];
      await updateSettings({
        popup: {
          ...settings.popup,
          customPrompts: updatedPrompts
        }
      });
    } catch (err) {
      console.error('Error adding custom prompt:', err);
      throw err;
    }
  };

  const removeCustomPrompt = async (prompt: string) => {
    if (!user) return;

    try {
      const updatedPrompts = settings.popup.customPrompts.filter(p => p !== prompt);
      await updateSettings({
        popup: {
          ...settings.popup,
          customPrompts: updatedPrompts
        }
      });
    } catch (err) {
      console.error('Error removing custom prompt:', err);
      throw err;
    }
  };

  const value = {
    settings,
    updateSettings,
    addCustomPrompt,
    removeCustomPrompt,
    loading,
    error
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}