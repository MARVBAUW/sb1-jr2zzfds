import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { BankAccounts } from './BankAccounts';
import { Transactions } from './Transactions';
import { Invoices } from './Invoices';
import { Reports } from './Reports';
import { Settings } from './Settings';
import { ComingSoon } from './ComingSoon';
import { SectionKPIs } from '../../components/SectionKPIs';
import { FileText, Building2, Receipt, FileBarChart2, Settings as SettingsIcon } from 'lucide-react';

const accountingModules = [
  {
    path: '/comptabilite/comptes',
    name: 'Comptes bancaires',
    icon: Building2,
    component: BankAccounts,
    description: 'Gestion des comptes et suivi des soldes'
  },
  {
    path: '/comptabilite/transactions',
    name: 'Transactions',
    icon: FileText,
    component: Transactions,
    description: 'Suivi des mouvements financiers'
  },
  {
    path: '/comptabilite/factures',
    name: 'Factures',
    icon: Receipt,
    component: Invoices,
    description: 'Gestion des factures clients et fournisseurs'
  },
  {
    path: '/comptabilite/rapports',
    name: 'Rapports',
    icon: FileBarChart2,
    component: Reports,
    description: 'Rapports financiers et analyses'
  },
  {
    path: '/comptabilite/parametres',
    name: 'Paramètres',
    icon: SettingsIcon,
    component: Settings,
    description: 'Configuration de la gestion comptable'
  }
];

export function Comptabilite() {
  const location = useLocation();
  const currentModule = accountingModules.find(module => 
    location.pathname.startsWith(module.path)
  );

  return (
    <div className="min-h-screen">
      {/* Navigation secondaire */}
      {location.pathname === '/comptabilite' && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountingModules.map((module) => (
            <a
              key={module.path}
              href={module.path}
              className="glass-panel p-6 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <module.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-200">{module.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{module.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="comptes" element={<BankAccounts />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="factures" element={<Invoices />} />
        <Route path="rapports" element={<Reports />} />
        <Route path="parametres" element={<Settings />} />
      </Routes>

      {/* Section KPIs */}
      {currentModule && (
        <SectionKPIs section={currentModule.path.split('/').pop() || ''} />
      )}
    </div>
  );
}