export interface Theme {
  name: string;
  displayName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface ThemeVariables {
  '--cv-primary': string;
  '--cv-secondary': string;
  '--cv-accent': string;
  '--cv-background': string;
  '--cv-text': string;
  '--cv-card-bg': string;
  '--cv-border': string;
  '--cv-gradient-from': string;
  '--cv-gradient-to': string;
}

export const DEFAULT_THEMES: Theme[] = [
  {
    name: 'professional-blue',
    displayName: 'Azul Profesional',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    accentColor: '#10b981',
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    cardBackground: '#ffffff',
    borderColor: '#e2e8f0',
    gradientFrom: '#2563eb',
    gradientTo: '#7c3aed'
  },
  {
    name: 'elegant-dark',
    displayName: 'Elegante Oscuro',
    primaryColor: '#6366f1',
    secondaryColor: '#94a3b8',
    accentColor: '#06b6d4',
    backgroundColor: '#0f172a',
    textColor: '#f1f5f9',
    cardBackground: '#1e293b',
    borderColor: '#334155',
    gradientFrom: '#6366f1',
    gradientTo: '#06b6d4'
  },
  {
    name: 'creative-purple',
    displayName: 'Morado Creativo',
    primaryColor: '#7c3aed',
    secondaryColor: '#64748b',
    accentColor: '#f59e0b',
    backgroundColor: '#fefbff',
    textColor: '#1e293b',
    cardBackground: '#ffffff',
    borderColor: '#e2e8f0',
    gradientFrom: '#7c3aed',
    gradientTo: '#ec4899'
  },
  {
    name: 'modern-green',
    displayName: 'Verde Moderno',
    primaryColor: '#059669',
    secondaryColor: '#64748b',
    accentColor: '#dc2626',
    backgroundColor: '#f0fdf4',
    textColor: '#1e293b',
    cardBackground: '#ffffff',
    borderColor: '#dcfce7',
    gradientFrom: '#059669',
    gradientTo: '#0891b2'
  }
];

export type ThemeName = 'professional-blue' | 'elegant-dark' | 'creative-purple' | 'modern-green';