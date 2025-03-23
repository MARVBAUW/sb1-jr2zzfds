import React, { useState } from 'react';
import { Save, Bell, Lock, Globe, User, Database, Zap, Palette } from 'lucide-react';
import { ThemeCustomizer } from '../components/ThemeCustomizer';
import { NotificationSettings } from '../components/NotificationSettings';

const tabs = [
  { id: 'profile', name: 'Profil', icon: User },
  { id: 'theme', name: 'Personnalisation', icon: Palette },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Sécurité', icon: Lock },
  { id: 'language', name: 'Langue et région', icon: Globe }
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Paramètres de l'application
          </h1>
          <p className="text-gray-400 mt-1">Configuration générale de votre compte et de l'application</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 glass-panel p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:text-gray-300 hover:bg-dark-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-panel">
        {activeTab === 'profile' && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-cyan-500/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-cyan-500/50"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="p-6">
            <ThemeCustomizer />
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6">
            <NotificationSettings />
          </div>
        )}

        {activeTab === 'security' && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-cyan-500/50"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-cyan-500/50"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'language' && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Langue
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                  text-gray-200 focus:outline-none focus:border-cyan-500/50">
                  <option>Français</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fuseau horaire
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                  text-gray-200 focus:outline-none focus:border-cyan-500/50">
                  <option>Europe/Paris (UTC+1)</option>
                  <option>UTC</option>
                  <option>America/New_York (UTC-5)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}