import React, { useState } from 'react';
import { 
  Building2, MapPin, Euro, TrendingUp, Plus, Search, Filter,
  Users2, Calendar, FileText, BarChart2, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const mockAssets = [
  {
    id: '1',
    name: 'Immeuble Haussmann',
    type: 'Résidentiel',
    location: 'Paris 8ème',
    surface: 850,
    units: 12,
    purchasePrice: 4500000,
    currentValue: 5200000,
    yearlyIncome: 280000,
    occupancyRate: 95,
    lastRenovation: '2022-06',
    performance: [
      { month: 'Jan', income: 23000 },
      { month: 'Fév', income: 23000 },
      { month: 'Mar', income: 23500 },
      { month: 'Avr', income: 23500 },
      { month: 'Mai', income: 23500 },
      { month: 'Juin', income: 23500 }
    ]
  },
  {
    id: '2',
    name: 'Centre Commercial Nord',
    type: 'Commercial',
    location: 'Lyon',
    surface: 2500,
    units: 8,
    purchasePrice: 6800000,
    currentValue: 7500000,
    yearlyIncome: 520000,
    occupancyRate: 88,
    lastRenovation: '2023-03',
    performance: [
      { month: 'Jan', income: 42000 },
      { month: 'Fév', income: 43000 },
      { month: 'Mar', income: 43500 },
      { month: 'Avr', income: 44000 },
      { month: 'Mai', income: 44000 },
      { month: 'Juin', income: 43500 }
    ]
  },
  {
    id: '3',
    name: 'Résidence Le Parc',
    type: 'Résidentiel',
    location: 'Bordeaux',
    surface: 1200,
    units: 15,
    purchasePrice: 3200000,
    currentValue: 3800000,
    yearlyIncome: 210000,
    occupancyRate: 100,
    lastRenovation: '2024-01',
    performance: [
      { month: 'Jan', income: 17000 },
      { month: 'Fév', income: 17500 },
      { month: 'Mar', income: 17500 },
      { month: 'Avr', income: 17500 },
      { month: 'Mai', income: 18000 },
      { month: 'Juin', income: 18000 }
    ]
  }
];

export function Portefeuille() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalValue = filteredAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalIncome = filteredAssets.reduce((sum, asset) => sum + asset.yearlyIncome, 0);
  const averageOccupancy = filteredAssets.reduce((sum, asset) => sum + asset.occupancyRate, 0) / filteredAssets.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
            Portefeuille
          </h1>
          <p className="text-gray-400 mt-1">Vue d'ensemble des actifs immobiliers</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un actif..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-[rgb(var(--accent))] border border-[rgb(var(--border))]
                text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] 
                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 w-64"
            />
          </div>
          <button className="p-2 rounded-lg bg-[rgb(var(--accent))] border border-[rgb(var(--border))]
            hover:bg-[rgb(var(--hover))] transition-all duration-200">
            <Filter className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 
            text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 
            transition-all duration-300 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un actif
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))]">Valeur du portefeuille</h3>
          </div>
          <p className="text-2xl font-light text-[rgb(var(--foreground))]">
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalValue)}
          </p>
          <div className="flex items-center gap-1 mt-2 text-sm text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <span>+15.2% sur 12 mois</span>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))]">Revenus annuels</h3>
          </div>
          <p className="text-2xl font-light text-[rgb(var(--foreground))]">
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalIncome)}
          </p>
          <div className="flex items-center gap-1 mt-2 text-sm text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <span>+8.5% sur 12 mois</span>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-medium text-[rgb(var(--muted-foreground))]">Taux d'occupation</h3>
          </div>
          <p className="text-2xl font-light text-[rgb(var(--foreground))]">
            {averageOccupancy.toFixed(1)}%
          </p>
          <div className="flex items-center gap-1 mt-2 text-sm text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <span>+2.3% sur 12 mois</span>
          </div>
        </div>
      </div>

      {/* Asset List */}
      <div className="space-y-6">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="glass-panel p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Asset Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-[rgb(var(--foreground))]">{asset.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-[rgb(var(--muted-foreground))]">
                      <MapPin className="w-4 h-4" />
                      {asset.location}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 
                    border border-blue-500/20">
                    {asset.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Surface</p>
                    <p className="text-[rgb(var(--foreground))]">{asset.surface} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Unités</p>
                    <p className="text-[rgb(var(--foreground))]">{asset.units}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Calendar className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                  <span className="text-sm text-[rgb(var(--muted-foreground))]">
                    Dernière rénovation : {new Date(asset.lastRenovation).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              {/* Financial Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Valeur actuelle</p>
                  <p className="text-xl font-light text-[rgb(var(--foreground))]">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(asset.currentValue)}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>
                      +{(((asset.currentValue - asset.purchasePrice) / asset.purchasePrice) * 100).toFixed(1)}% 
                      depuis l'acquisition
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Revenus annuels</p>
                  <p className="text-xl font-light text-[rgb(var(--foreground))]">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(asset.yearlyIncome)}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>Rendement {((asset.yearlyIncome / asset.currentValue) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Performance</p>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-[rgb(var(--hover))] 
                      text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] 
                      transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[rgb(var(--hover))] 
                      text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] 
                      transition-colors">
                      <BarChart2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={asset.performance}>
                      <defs>
                        <linearGradient id={`colorIncome${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="rgb(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="rgb(var(--muted-foreground))" fontSize={10} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgb(var(--background))',
                          border: '1px solid rgb(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                        formatter={(value) => new Intl.NumberFormat('fr-FR', { 
                          style: 'currency', 
                          currency: 'EUR' 
                        }).format(value as number)}
                      />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill={`url(#colorIncome${asset.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}