import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';

const mockReports = [
  {
    id: '1',
    name: 'Bilan mensuel - Mars 2024',
    type: 'monthly',
    date: '2024-03-15',
    size: '2.5 MB'
  },
  {
    id: '2',
    name: 'Rapport TVA - T1 2024',
    type: 'quarterly',
    date: '2024-03-31',
    size: '1.8 MB'
  },
  {
    id: '3',
    name: 'Analyse budgétaire',
    type: 'custom',
    date: '2024-03-10',
    size: '3.2 MB'
  }
];

export function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Rapports
          </h1>
          <p className="text-gray-400 mt-1">Génération et consultation des rapports financiers</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
            hover:bg-dark-600/50 hover:border-cyan-500/50 transition-all duration-200">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Nouveau rapport</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => (
          <div key={report.id} className="glass-panel p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-200">{report.name}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(report.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-dark-600/50 transition-colors duration-200">
                <Download className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className={`px-2.5 py-1 rounded-full text-xs ${
                report.type === 'monthly'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : report.type === 'quarterly'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
              }`}>
                {report.type === 'monthly' ? 'Mensuel' :
                 report.type === 'quarterly' ? 'Trimestriel' : 'Personnalisé'}
              </span>
              <span className="text-gray-400">{report.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}