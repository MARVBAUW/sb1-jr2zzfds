import React, { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, ShoppingBag, Leaf, HardHat, Bot, Coins, 
  Plus, X, Save, AlertTriangle 
} from 'lucide-react';

export function NotificationSettings() {
  const { 
    settings, 
    updateSettings, 
    addCustomPrompt, 
    removeCustomPrompt,
    loading,
    error 
  } = useNotifications();

  const [newPrompt, setNewPrompt] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateSettings(settings);
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;

    try {
      await addCustomPrompt(newPrompt.trim());
      setNewPrompt('');
    } catch (err) {
      console.error('Error adding prompt:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Chargement des paramètres...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 
          flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Marketplace Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-200">
          <ShoppingBag className="w-5 h-5 text-purple-400" />
          <h3 className="font-medium">Marketplace</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Nouvelles annonces</span>
            <input
              type="checkbox"
              checked={settings.marketplace.newListings}
              onChange={(e) => updateSettings({
                marketplace: { ...settings.marketplace, newListings: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Changements de prix</span>
            <input
              type="checkbox"
              checked={settings.marketplace.priceChanges}
              onChange={(e) => updateSettings({
                marketplace: { ...settings.marketplace, priceChanges: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Mises à jour des commandes</span>
            <input
              type="checkbox"
              checked={settings.marketplace.orderUpdates}
              onChange={(e) => updateSettings({
                marketplace: { ...settings.marketplace, orderUpdates: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
          </label>
        </div>
      </div>

      {/* Venture Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-200">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <h3 className="font-medium">Venture</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Nouveaux projets</span>
            <input
              type="checkbox"
              checked={settings.venture.newProjects}
              onChange={(e) => updateSettings({
                venture: { ...settings.venture, newProjects: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Mises à jour des investissements</span>
            <input
              type="checkbox"
              checked={settings.venture.investmentUpdates}
              onChange={(e) => updateSettings({
                venture: { ...settings.venture, investmentUpdates: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Jalons atteints</span>
            <input
              type="checkbox"
              checked={settings.venture.milestones}
              onChange={(e) => updateSettings({
                venture: { ...settings.venture, milestones: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </div>

      {/* Chantier Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-200">
          <HardHat className="w-5 h-5 text-amber-400" />
          <h3 className="font-medium">Chantier</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Avancement des travaux</span>
            <input
              type="checkbox"
              checked={settings.chantier.progress}
              onChange={(e) => updateSettings({
                chantier: { ...settings.chantier, progress: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Problèmes signalés</span>
            <input
              type="checkbox"
              checked={settings.chantier.issues}
              onChange={(e) => updateSettings({
                chantier: { ...settings.chantier, issues: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Réunions de chantier</span>
            <input
              type="checkbox"
              checked={settings.chantier.meetings}
              onChange={(e) => updateSettings({
                chantier: { ...settings.chantier, meetings: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Nouveaux documents</span>
            <input
              type="checkbox"
              checked={settings.chantier.documents}
              onChange={(e) => updateSettings({
                chantier: { ...settings.chantier, documents: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>
      </div>

      {/* Popup Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-200">
          <Bell className="w-5 h-5 text-blue-400" />
          <h3 className="font-medium">Popups</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Assistant IA</span>
            </div>
            <input
              type="checkbox"
              checked={settings.popup.ai}
              onChange={(e) => updateSettings({
                popup: { ...settings.popup, ai: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">Venture</span>
            </div>
            <input
              type="checkbox"
              checked={settings.popup.venture}
              onChange={(e) => updateSettings({
                popup: { ...settings.popup, venture: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-300">Balance NOVX</span>
            </div>
            <input
              type="checkbox"
              checked={settings.popup.balance}
              onChange={(e) => updateSettings({
                popup: { ...settings.popup, balance: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-dark-600/50 peer-focus:outline-none rounded-full peer 
              peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {/* Custom AI Prompts */}
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-medium text-gray-300">Prompts personnalisés</h4>
          
          <div className="space-y-2">
            {settings.popup.customPrompts.map((prompt, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-dark-700/30 
                  border border-gray-700/50"
              >
                <span className="text-sm text-gray-300">{prompt}</span>
                <button
                  onClick={() => removeCustomPrompt(prompt)}
                  className="p-1 rounded-lg hover:bg-dark-600/50 text-gray-400 
                    hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddPrompt} className="flex gap-2">
            <input
              type="text"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              placeholder="Ajouter un prompt..."
              className="flex-1 px-3 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
                text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 
                hover:bg-cyan-500/20 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r 
            from-cyan-500 to-blue-500 text-white font-medium shadow-lg 
            shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
      </div>
    </div>
  );
}