import React from 'react';
import { Save } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Paramètres comptables
          </h1>
          <p className="text-gray-400 mt-1">Configuration de la gestion comptable</p>
        </div>
      </div>

      <div className="glass-panel p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Régime fiscal
              </label>
              <select className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                text-gray-200 focus:outline-none focus:border-cyan-500/50">
                <option>BIC</option>
                <option>SCI</option>
                <option>LMNP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Régime TVA
              </label>
              <select className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                text-gray-200 focus:outline-none focus:border-cyan-500/50">
                <option>TVA sur encaissement</option>
                <option>TVA sur débit</option>
                <option>TVA sur marge</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Seuil d'alerte trésorerie
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                  text-gray-200 focus:outline-none focus:border-cyan-500/50"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Délai de paiement par défaut
              </label>
              <select className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                text-gray-200 focus:outline-none focus:border-cyan-500/50">
                <option>30 jours</option>
                <option>45 jours</option>
                <option>60 jours</option>
                <option>90 jours</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}