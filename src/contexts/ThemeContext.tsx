import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeColors {
  baseIcons: {
    dashboard: string;
    workspace: string;
    marketplace: string;
    accounting: string;
    settings: string;
  };
  premiumModules: {
    maitreOeuvre: string;
    maitreOuvrage: string;
    entreprise: string;
    particuliers: string;
    agents: string;
  };
  charts: {
    primary: string;
    secondary: string;
    tertiary: string;
    success: string;
    warning: string;
    danger: string;
    grid: string;
    tooltip: string;
    label: string;
  };
  kpi: {
    positive: string;
    negative: string;
    neutral: string;
    background: string;
    border: string;
  };
  brandName: string;
  pageTitle: string;
  text: {
    body: string;
    subtitle: string;
    heading: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
  };
  border: {
    width: string;
    style: string;
    radius: string;
    color: string;
  };
  background: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
  updateColors: (newColors: Partial<ThemeColors>) => void;
  resetToDefaults: () => void;
}

const defaultDarkColors: ThemeColors = {
  baseIcons: {
    dashboard: '#94A3B8',
    workspace: '#94A3B8',
    marketplace: '#94A3B8',
    accounting: '#94A3B8',
    settings: '#94A3B8',
  },
  premiumModules: {
    maitreOeuvre: '#10B981',
    maitreOuvrage: '#3B82F6',
    entreprise: '#8B5CF6',
    particuliers: '#F59E0B',
    agents: '#EC4899',
  },
  charts: {
    primary: '#10B981',
    secondary: '#3B82F6',
    tertiary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    grid: '#374151',
    tooltip: '#1F2937',
    label: '#9CA3AF',
  },
  kpi: {
    positive: '#10B981',
    negative: '#EF4444',
    neutral: '#6B7280',
    background: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.2)',
  },
  brandName: '#0EA5E9',
  pageTitle: '#0EA5E9',
  text: {
    body: '#D1D5DB',
    subtitle: '#9CA3AF',
    heading: '#F3F4F6',
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '-0.01em',
  },
  border: {
    width: '1px',
    style: 'solid',
    radius: '8px',
    color: 'rgba(255, 255, 255, 0.1)',
  },
  background: {
    primary: '#0B0B0C',
    secondary: '#141415',
    accent: '#1E1E1F',
    gradient: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(16,185,129,0.1))',
  },
};

const defaultLightColors: ThemeColors = {
  baseIcons: {
    dashboard: '#64748B',
    workspace: '#64748B',
    marketplace: '#64748B',
    accounting: '#64748B',
    settings: '#64748B',
  },
  premiumModules: {
    maitreOeuvre: '#059669',
    maitreOuvrage: '#2563EB',
    entreprise: '#7C3AED',
    particuliers: '#D97706',
    agents: '#DB2777',
  },
  charts: {
    primary: '#059669',
    secondary: '#2563EB',
    tertiary: '#7C3AED',
    success: '#059669',
    warning: '#D97706',
    danger: '#DC2626',
    grid: '#E5E7EB',
    tooltip: '#F3F4F6',
    label: '#6B7280',
  },
  kpi: {
    positive: '#059669',
    negative: '#DC2626',
    neutral: '#6B7280',
    background: 'rgba(5, 150, 105, 0.1)',
    border: 'rgba(5, 150, 105, 0.2)',
  },
  brandName: '#0284C7',
  pageTitle: '#0284C7',
  text: {
    body: '#374151',
    subtitle: '#6B7280',
    heading: '#111827',
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '-0.01em',
  },
  border: {
    width: '1px',
    style: 'solid',
    radius: '8px',
    color: 'rgba(0, 0, 0, 0.1)',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    accent: '#F3F4F6',
    gradient: 'linear-gradient(135deg, rgba(14,165,233,0.05), rgba(16,185,129,0.05))',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'dark';
  });

  const [colors, setColors] = useState<ThemeColors>(() => {
    const savedColors = localStorage.getItem(`${theme}Colors`);
    if (savedColors) {
      try {
        return JSON.parse(savedColors);
      } catch {
        return theme === 'dark' ? defaultDarkColors : defaultLightColors;
      }
    }
    return theme === 'dark' ? defaultDarkColors : defaultLightColors;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);

    // Load theme-specific colors
    const savedColors = localStorage.getItem(`${theme}Colors`);
    if (savedColors) {
      try {
        setColors(JSON.parse(savedColors));
      } catch {
        setColors(theme === 'dark' ? defaultDarkColors : defaultLightColors);
      }
    } else {
      setColors(theme === 'dark' ? defaultDarkColors : defaultLightColors);
    }
  }, [theme]);

  useEffect(() => {
    if (colors) {
      localStorage.setItem(`${theme}Colors`, JSON.stringify(colors));
      applyThemeColors(colors);
    }
  }, [colors, theme]);

  const applyThemeColors = (themeColors: ThemeColors) => {
    const style = document.documentElement.style;

    // Apply base icon colors
    Object.entries(themeColors.baseIcons).forEach(([key, value]) => {
      style.setProperty(`--icon-${key}`, value);
    });

    // Apply premium module colors
    Object.entries(themeColors.premiumModules).forEach(([key, value]) => {
      style.setProperty(`--module-${key}`, value);
    });

    // Apply chart colors
    Object.entries(themeColors.charts).forEach(([key, value]) => {
      style.setProperty(`--chart-${key}`, value);
    });

    // Apply KPI colors
    Object.entries(themeColors.kpi).forEach(([key, value]) => {
      style.setProperty(`--kpi-${key}`, value);
    });

    // Apply visual element colors
    style.setProperty('--brand-name', themeColors.brandName);
    style.setProperty('--page-title', themeColors.pageTitle);

    // Apply text colors
    Object.entries(themeColors.text).forEach(([key, value]) => {
      style.setProperty(`--text-${key}`, value);
    });

    // Apply typography styles
    Object.entries(themeColors.typography).forEach(([key, value]) => {
      style.setProperty(`--${key}`, value);
    });

    // Apply border styles
    Object.entries(themeColors.border).forEach(([key, value]) => {
      style.setProperty(`--border-${key}`, value);
    });

    // Apply background styles
    Object.entries(themeColors.background).forEach(([key, value]) => {
      style.setProperty(`--bg-${key}`, value);
    });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const updateColors = (newColors: Partial<ThemeColors>) => {
    setColors(prev => {
      const updated = {
        ...prev,
        ...newColors,
        baseIcons: {
          ...prev.baseIcons,
          ...(newColors.baseIcons || {})
        },
        premiumModules: {
          ...prev.premiumModules,
          ...(newColors.premiumModules || {})
        },
        charts: {
          ...prev.charts,
          ...(newColors.charts || {})
        },
        kpi: {
          ...prev.kpi,
          ...(newColors.kpi || {})
        },
        text: {
          ...prev.text,
          ...(newColors.text || {})
        },
        typography: {
          ...prev.typography,
          ...(newColors.typography || {})
        },
        border: {
          ...prev.border,
          ...(newColors.border || {})
        },
        background: {
          ...prev.background,
          ...(newColors.background || {})
        }
      };
      return updated;
    });
  };

  const resetToDefaults = () => {
    setColors(theme === 'dark' ? defaultDarkColors : defaultLightColors);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, updateColors, resetToDefaults }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}