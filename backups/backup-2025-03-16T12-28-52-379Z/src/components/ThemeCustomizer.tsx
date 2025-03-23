import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { 
  Command, Boxes, ShoppingBag, Calculator, Cog, Palette,
  Hammer, Building2, Factory, Users2, HomeIcon, RotateCcw,
  Type, ListOrdered as BorderAll, Layout, Sun, Moon, Text,
  Sparkles, ChevronRight, Check, X, BarChart2, TrendingUp
} from 'lucide-react';

// Define preset themes
const presetThemes = {
  modern: {
    name: 'Modern',
    dark: {
      baseIcons: {
        dashboard: '#0EA5E9',
        workspace: '#6366F1',
        marketplace: '#8B5CF6',
        accounting: '#EC4899',
        settings: '#10B981'
      },
      premiumModules: {
        maitreOeuvre: '#10B981',
        maitreOuvrage: '#3B82F6',
        entreprise: '#8B5CF6',
        particuliers: '#F59E0B',
        agents: '#EC4899'
      },
      text: {
        body: '#E5E7EB',
        subtitle: '#9CA3AF',
        heading: '#F9FAFB'
      },
      background: {
        primary: '#0B0B0C',
        secondary: '#141415',
        accent: '#1E1E1F',
        gradient: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(16,185,129,0.1))'
      }
    },
    light: {
      baseIcons: {
        dashboard: '#0EA5E9',
        workspace: '#6366F1',
        marketplace: '#8B5CF6',
        accounting: '#EC4899',
        settings: '#10B981'
      },
      premiumModules: {
        maitreOeuvre: '#059669',
        maitreOuvrage: '#2563EB',
        entreprise: '#7C3AED',
        particuliers: '#D97706',
        agents: '#DB2777'
      },
      text: {
        body: '#374151',
        subtitle: '#6B7280',
        heading: '#111827'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F9FAFB',
        accent: '#F3F4F6',
        gradient: 'linear-gradient(135deg, rgba(14,165,233,0.05), rgba(16,185,129,0.05))'
      }
    }
  },
  minimal: {
    name: 'Minimal',
    dark: {
      baseIcons: {
        dashboard: '#94A3B8',
        workspace: '#94A3B8',
        marketplace: '#94A3B8',
        accounting: '#94A3B8',
        settings: '#94A3B8'
      },
      premiumModules: {
        maitreOeuvre: '#94A3B8',
        maitreOuvrage: '#94A3B8',
        entreprise: '#94A3B8',
        particuliers: '#94A3B8',
        agents: '#94A3B8'
      },
      text: {
        body: '#CBD5E1',
        subtitle: '#94A3B8',
        heading: '#F1F5F9'
      },
      background: {
        primary: '#0F172A',
        secondary: '#1E293B',
        accent: '#334155',
        gradient: 'linear-gradient(135deg, rgba(148,163,184,0.1), rgba(148,163,184,0.05))'
      }
    },
    light: {
      baseIcons: {
        dashboard: '#64748B',
        workspace: '#64748B',
        marketplace: '#64748B',
        accounting: '#64748B',
        settings: '#64748B'
      },
      premiumModules: {
        maitreOeuvre: '#64748B',
        maitreOuvrage: '#64748B',
        entreprise: '#64748B',
        particuliers: '#64748B',
        agents: '#64748B'
      },
      text: {
        body: '#334155',
        subtitle: '#64748B',
        heading: '#0F172A'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F8FAFC',
        accent: '#F1F5F9',
        gradient: 'linear-gradient(135deg, rgba(100,116,139,0.05), rgba(100,116,139,0.02))'
      }
    }
  },
  vibrant: {
    name: 'Vibrant',
    dark: {
      baseIcons: {
        dashboard: '#F472B6',
        workspace: '#818CF8',
        marketplace: '#A78BFA',
        accounting: '#34D399',
        settings: '#60A5FA'
      },
      premiumModules: {
        maitreOeuvre: '#34D399',
        maitreOuvrage: '#60A5FA',
        entreprise: '#A78BFA',
        particuliers: '#FBBF24',
        agents: '#F472B6'
      },
      text: {
        body: '#E5E7EB',
        subtitle: '#9CA3AF',
        heading: '#F9FAFB'
      },
      background: {
        primary: '#0B0B0C',
        secondary: '#141415',
        accent: '#1E1E1F',
        gradient: 'linear-gradient(135deg, rgba(244,114,182,0.1), rgba(52,211,153,0.1))'
      }
    },
    light: {
      baseIcons: {
        dashboard: '#EC4899',
        workspace: '#6366F1',
        marketplace: '#8B5CF6',
        accounting: '#10B981',
        settings: '#3B82F6'
      },
      premiumModules: {
        maitreOeuvre: '#10B981',
        maitreOuvrage: '#3B82F6',
        entreprise: '#8B5CF6',
        particuliers: '#F59E0B',
        agents: '#EC4899'
      },
      text: {
        body: '#374151',
        subtitle: '#6B7280',
        heading: '#111827'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F9FAFB',
        accent: '#F3F4F6',
        gradient: 'linear-gradient(135deg, rgba(236,72,153,0.05), rgba(16,185,129,0.05))'
      }
    }
  },
  professional: {
    name: 'Professional',
    dark: {
      baseIcons: {
        dashboard: '#2DD4BF',
        workspace: '#4F46E5',
        marketplace: '#8B5CF6',
        accounting: '#F43F5E',
        settings: '#0EA5E9'
      },
      premiumModules: {
        maitreOeuvre: '#2DD4BF',
        maitreOuvrage: '#4F46E5',
        entreprise: '#8B5CF6',
        particuliers: '#F59E0B',
        agents: '#F43F5E'
      },
      text: {
        body: '#E5E7EB',
        subtitle: '#9CA3AF',
        heading: '#F9FAFB'
      },
      background: {
        primary: '#0B0B0C',
        secondary: '#141415',
        accent: '#1E1E1F',
        gradient: 'linear-gradient(135deg, rgba(45,212,191,0.1), rgba(79,70,229,0.1))'
      }
    },
    light: {
      baseIcons: {
        dashboard: '#14B8A6',
        workspace: '#4F46E5',
        marketplace: '#8B5CF6',
        accounting: '#E11D48',
        settings: '#0EA5E9'
      },
      premiumModules: {
        maitreOeuvre: '#14B8A6',
        maitreOuvrage: '#4F46E5',
        entreprise: '#8B5CF6',
        particuliers: '#F59E0B',
        agents: '#E11D48'
      },
      text: {
        body: '#374151',
        subtitle: '#6B7280',
        heading: '#111827'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F9FAFB',
        accent: '#F3F4F6',
        gradient: 'linear-gradient(135deg, rgba(20,184,166,0.05), rgba(79,70,229,0.05))'
      }
    }
  }
};

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  color: string;
  onChange: (color: string) => void;
  label: string;
}

function ColorPickerModal({ isOpen, onClose, color, onChange, label }: ColorPickerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            className="bg-dark-800 rounded-xl border border-gray-700/50 p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-200">{label}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-dark-700/50 text-gray-400 
                  hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <HexColorPicker color={color} onChange={onChange} />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-dark-600/50 border border-gray-700/50 
                    text-gray-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 
                  border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-200"
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

function ColorPicker({ label, value, onChange, icon }: ColorPickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between w-full p-3 rounded-lg bg-dark-700/30 
          border border-gray-700/50 hover:bg-dark-600/50 hover:border-cyan-500/50 
          transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="w-5 h-5">{icon}</div>}
          <span className="text-sm text-gray-300 group-hover:text-gray-200">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full border border-gray-700/50"
            style={{ backgroundColor: value }}
          />
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
        </div>
      </button>

      <ColorPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        color={value}
        onChange={onChange}
        label={label}
      />
    </>
  );
}

interface StylePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  type?: 'text' | 'select';
}

function StylePicker({ label, value, onChange, options, type = 'text' }: StylePickerProps) {
  return (
    <div className="flex items-center justify-between w-full p-3 rounded-lg bg-dark-700/30 
      border border-gray-700/50 group">
      <label className="text-sm text-gray-300 group-hover:text-gray-200">{label}</label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg bg-dark-600/50 border border-gray-700/50 
            text-gray-200 focus:outline-none focus:border-cyan-500/50"
        >
          {options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-48 px-3 py-1.5 text-sm rounded-lg bg-dark-600/50 border border-gray-700/50 
            text-gray-200 focus:outline-none focus:border-cyan-500/50"
        />
      )}
    </div>
  );
}

export function ThemeCustomizer() {
  const { colors, updateColors, resetToDefaults, theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'presets',
      title: 'Thèmes prédéfinis',
      icon: Sparkles,
      content: (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(presetThemes).map(([key, preset]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => applyPresetTheme(key as keyof typeof presetThemes)}
              className="p-4 rounded-lg bg-dark-700/30 border border-gray-700/50 
                hover:bg-dark-600/50 hover:border-cyan-500/50 transition-all duration-200
                text-left"
            >
              <h4 className="text-gray-200 font-medium mb-2">{preset.name}</h4>
              <div className="flex gap-2">
                {Object.values(preset[theme].baseIcons).map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      id: 'icons',
      title: 'Icônes de navigation',
      icon: Command,
      content: (
        <div className="space-y-4">
          <ColorPicker
            label="Dashboard"
            value={colors.baseIcons.dashboard}
            onChange={(color) => updateColors({ baseIcons: { ...colors.baseIcons, dashboard: color } })}
            icon={<Command />}
          />
          <ColorPicker
            label="Workspace"
            value={colors.baseIcons.workspace}
            onChange={(color) => updateColors({ baseIcons: { ...colors.baseIcons, workspace: color } })}
            icon={<Boxes />}
          />
          <ColorPicker
            label="Marketplace"
            value={colors.baseIcons.marketplace}
            onChange={(color) => updateColors({ baseIcons: { ...colors.baseIcons, marketplace: color } })}
            icon={<ShoppingBag />}
          />
          <ColorPicker
            label="Comptabilité"
            value={colors.baseIcons.accounting}
            onChange={(color) => updateColors({ baseIcons: { ...colors.baseIcons, accounting: color } })}
            icon={<Calculator />}
          />
          <ColorPicker
            label="Paramètres"
            value={colors.baseIcons.settings}
            onChange={(color) => updateColors({ baseIcons: { ...colors.baseIcons, settings: color } })}
            icon={<Cog />}
          />
        </div>
      )
    },
    {
      id: 'modules',
      title: 'Modules premium',
      icon: Palette,
      content: (
        <div className="space-y-4">
          <ColorPicker
            label="Maître d'œuvre"
            value={colors.premiumModules.maitreOeuvre}
            onChange={(color) => updateColors({ premiumModules: { ...colors.premiumModules, maitreOeuvre: color } })}
            icon={<Hammer />}
          />
          <ColorPicker
            label="Maître d'ouvrage"
            value={colors.premiumModules.maitreOuvrage}
            onChange={(color) => updateColors({ premiumModules: { ...colors.premiumModules, maitreOuvrage: color } })}
            icon={<Building2 />}
          />
          <ColorPicker
            label="Entreprise"
            value={colors.premiumModules.entreprise}
            onChange={(color) => updateColors({ premiumModules: { ...colors.premiumModules, entreprise: color } })}
            icon={<Factory />}
          />
          <ColorPicker
            label="Particuliers"
            value={colors.premiumModules.particuliers}
            onChange={(color) => updateColors({ premiumModules: { ...colors.premiumModules, particuliers: color } })}
            icon={<Users2 />}
          />
          <ColorPicker
            label="Agents"
            value={colors.premiumModules.agents}
            onChange={(color) => updateColors({ premiumModules: { ...colors.premiumModules, agents: color } })}
            icon={<HomeIcon />}
          />
        </div>
      )
    },
    {
      id: 'typography',
      title: 'Typographie',
      icon: Type,
      content: (
        <div className="space-y-4">
          <ColorPicker
            label="Texte principal"
            value={colors.text.body}
            onChange={(color) => updateColors({ text: { ...colors.text, body: color } })}
            icon={<Text />}
          />
          <ColorPicker
            label="Sous-titres"
            value={colors.text.subtitle}
            onChange={(color) => updateColors({ text: { ...colors.text, subtitle: color } })}
            icon={<Text />}
          />
          <ColorPicker
            label="Titres"
            value={colors.text.heading}
            onChange={(color) => updateColors({ text: { ...colors.text, heading: color } })}
            icon={<Text />}
          />
          <StylePicker
            label="Police"
            value={colors.typography.fontFamily}
            onChange={(value) => updateColors({ typography: { ...colors.typography, fontFamily: value } })}
            options={['Poppins, sans-serif', 'Inter, sans-serif', 'Roboto, sans-serif']}
            type="select"
          />
          <StylePicker
            label="Taille de base"
            value={colors.typography.fontSize}
            onChange={(value) => updateColors({ typography: { ...colors.typography, fontSize: value } })}
          />
        </div>
      )
    },
    {
      id: 'borders',
      title: 'Bordures',
      icon: BorderAll,
      content: (
        <div className="space-y-4">
          <StylePicker
            label="Épaisseur"
            value={colors.border.width}
            onChange={(value) => updateColors({ border: { ...colors.border, width: value } })}
          />
          <StylePicker
            label="Style"
            value={colors.border.style}
            onChange={(value) => updateColors({ border: { ...colors.border, style: value } })}
            options={['solid', 'dashed', 'dotted']}
            type="select"
          />
          <StylePicker
            label="Rayon"
            value={colors.border.radius}
            onChange={(value) => updateColors({ border: { ...colors.border, radius: value } })}
          />
          <ColorPicker
            label="Couleur"
            value={colors.border.color}
            onChange={(color) => updateColors({ border: { ...colors.border, color: color } })}
          />
        </div>
      )
    },
    {
      id: 'backgrounds',
      title: 'Arrière-plans',
      icon: Layout,
      content: (
        <div className="space-y-4">
          <ColorPicker
            label="Principal"
            value={colors.background.primary}
            onChange={(color) => updateColors({ background: { ...colors.background, primary: color } })}
          />
          <ColorPicker
            label="Secondaire"
            value={colors.background.secondary}
            onChange={(color) => updateColors({ background: { ...colors.background, secondary: color } })}
          />
          <ColorPicker
            label="Accent"
            value={colors.background.accent}
            onChange={(color) => updateColors({ background: { ...colors.background, accent: color } })}
          />
          <StylePicker
            label="Dégradé"
            value={colors.background.gradient}
            onChange={(value) => updateColors({ background: { ...colors.background, gradient: value } })}
          />
        </div>
      )
    },
    {
      id: 'charts',
      title: 'Graphiques',
      icon: BarChart2,
      content: (
        <div className="space-y-4">
          <ColorPicker
            label="Couleur primaire"
            value={colors.charts.primary}
            onChange={(color) => updateColors({ charts: { ...colors.charts, primary: color } })}
          />
          <ColorPicker
            label="Couleur secondaire"
            value={colors.charts.secondary}
            onChange={(color) => updateColors({ charts: { ...colors.charts, secondary: color } })}
          />
          <ColorPicker
            label="Couleur tertiaire"
            value={colors.charts.tertiary}
            onChange={(color) => updateColors({ charts: { ...colors.charts, tertiary: color } })}
          />
          <ColorPicker
            label="Succès"
            value={colors.charts.success}
            onChange={(color) => updateColors({ charts: { ...colors.charts, success: color } })}
          />
          <ColorPicker
            label="Avertissement"
            value={colors.charts.warning}
            onChange={(color) => updateColors({ charts: { ...colors.charts, warning: color } })}
          />
          <ColorPicker
            label="Danger"
            value={colors.charts.danger}
            onChange={(color) => updateColors({ charts: { ...colors.charts, danger: color } })}
          />
          <ColorPicker
            label="Grille"
            value={colors.charts.grid}
            onChange={(color) => updateColors({ charts: { ...colors.charts, grid: color } })}
          />
          <ColorPicker
            label="Infobulle"
            value={colors.charts.tooltip}
            onChange={(color) => updateColors({ charts: { ...colors.charts, tooltip: color } })}
          />
          <ColorPicker
            label="Étiquettes"
            value={colors.charts.label}
            onChange={(color) => updateColors({ charts: { ...colors.charts, label: color } })}
          />
        </div>
      )
    },
    {
      id: 'kpis',
      title: 'Indicateurs (KPIs)',
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <ColorPicker
            label="Positif"
            value={colors.kpi.positive}
            onChange={(color) => updateColors({ kpi: { ...colors.kpi, positive: color } })}
          />
          <ColorPicker
            label="Négatif"
            value={colors.kpi.negative}
            onChange={(color) => updateColors({ kpi: { ...colors.kpi, negative: color } })}
          />
          <ColorPicker
            label="Neutre"
            value={colors.kpi.neutral}
            onChange={(color) => updateColors({ kpi: { ...colors.kpi, neutral: color } })}
          />
          <ColorPicker
            label="Arrière-plan"
            value={colors.kpi.background}
            onChange={(color) => updateColors({ kpi: { ...colors.kpi, background: color } })}
          />
          <ColorPicker
            label="Bordure"
            value={colors.kpi.border}
            onChange={(color) => updateColors({ kpi: { ...colors.kpi, border: color } })}
          />
        </div>
      )
    }
  ];

  const applyPresetTheme = (presetName: keyof typeof presetThemes) => {
    const preset = presetThemes[presetName][theme];
    updateColors({
      baseIcons: preset.baseIcons,
      premiumModules: preset.premiumModules,
      text: preset.text,
      background: preset.background
    });
  };

  return (
    <div className="space-y-8">
      {/* Theme Mode Switch and Reset Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700/50 border border-gray-700/50 
              hover:bg-dark-600/50 hover:border-cyan-500/50 transition-all duration-200"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-gray-300">Mode clair</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-gray-300">Mode sombre</span>
              </>
            )}
          </button>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetToDefaults}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 
            border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Restaurer les paramètres par défaut
        </motion.button>
      </div>

      {/* Customization Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={false}
            animate={{ height: activeSection === section.id ? 'auto' : 'auto' }}
            className="glass-panel overflow-hidden"
          >
            <button
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className="flex items-center justify-between w-full p-4 text-left"
            >
              <div className="flex items-center gap-2">
                <section.icon className="w-5 h-5 text-cyan-400" />
                <h3 className="text-gray-200 font-medium">{section.title}</h3>
              </div>
              <motion.div
                animate={{ rotate: activeSection === section.id ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 pt-0"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}