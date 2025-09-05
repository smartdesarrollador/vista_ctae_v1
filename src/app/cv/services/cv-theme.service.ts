import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme, ThemeVariables, DEFAULT_THEMES, ThemeName } from '../models/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class CvThemeService {
  private currentThemeSubject = new BehaviorSubject<Theme>(DEFAULT_THEMES[0]);
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadThemeFromStorage();
      this.applyTheme(this.currentThemeSubject.value);
    }
  }

  // Observables públicos
  get currentTheme$(): Observable<Theme> {
    return this.currentThemeSubject.asObservable();
  }

  get isDarkMode$(): Observable<boolean> {
    return this.isDarkModeSubject.asObservable();
  }

  // Getters para valores actuales
  get currentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  // Métodos públicos
  setTheme(themeName: ThemeName): void {
    const theme = DEFAULT_THEMES.find(t => t.name === themeName);
    if (theme) {
      this.currentThemeSubject.next(theme);
      this.applyTheme(theme);
      this.saveThemeToStorage(theme.name);
    }
  }

  toggleDarkMode(): void {
    const newDarkMode = !this.isDarkMode;
    this.isDarkModeSubject.next(newDarkMode);
    this.applyDarkMode(newDarkMode);
    this.saveDarkModeToStorage(newDarkMode);
  }

  getAvailableThemes(): Theme[] {
    return DEFAULT_THEMES;
  }

  // Métodos para aplicar temas
  applyTheme(theme: Theme): void {
    const variables: ThemeVariables = {
      '--cv-primary': theme.primaryColor,
      '--cv-secondary': theme.secondaryColor,
      '--cv-accent': theme.accentColor,
      '--cv-background': theme.backgroundColor,
      '--cv-text': theme.textColor,
      '--cv-card-bg': theme.cardBackground,
      '--cv-border': theme.borderColor,
      '--cv-gradient-from': theme.gradientFrom,
      '--cv-gradient-to': theme.gradientTo
    };

    this.setCSSVariables(variables);
  }

  private applyDarkMode(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        // Aplicar variaciones oscuras al tema actual
        const darkVariables: Partial<ThemeVariables> = {
          '--cv-background': '#0f172a',
          '--cv-card-bg': '#1e293b',
          '--cv-text': '#f1f5f9',
          '--cv-border': '#334155'
        };
        this.setCSSVariables(darkVariables);
        document.documentElement.classList.add('dark');
      } else {
        // Restaurar tema original
        this.applyTheme(this.currentTheme);
        document.documentElement.classList.remove('dark');
      }
    }
  }

  private setCSSVariables(variables: Partial<ThemeVariables>): void {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      Object.entries(variables).forEach(([property, value]) => {
        if (value) {
          root.style.setProperty(property, value);
        }
      });
    }
  }

  private loadThemeFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const savedTheme = localStorage.getItem('cv-theme');
        const savedDarkMode = localStorage.getItem('cv-dark-mode');

        if (savedTheme) {
          const theme = DEFAULT_THEMES.find(t => t.name === savedTheme);
          if (theme) {
            this.currentThemeSubject.next(theme);
          }
        }

        if (savedDarkMode !== null) {
          this.isDarkModeSubject.next(JSON.parse(savedDarkMode));
        }
      } catch (error) {
        console.warn('Error loading theme from storage:', error);
      }
    }
  }

  private saveThemeToStorage(themeName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('cv-theme', themeName);
      } catch (error) {
        console.warn('Error saving theme to storage:', error);
      }
    }
  }

  private saveDarkModeToStorage(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('cv-dark-mode', JSON.stringify(isDark));
      } catch (error) {
        console.warn('Error saving dark mode to storage:', error);
      }
    }
  }

  // Método para obtener las clases CSS dinámicas
  getThemeClasses(): string[] {
    const theme = this.currentTheme;
    const isDark = this.isDarkMode;
    
    return [
      `theme-${theme.name}`,
      isDark ? 'dark-mode' : 'light-mode'
    ];
  }

  // Método para obtener estilos inline dinámicos
  getInlineStyles(): { [key: string]: string } {
    const theme = this.currentTheme;
    const isDark = this.isDarkMode;

    return {
      '--primary-color': theme.primaryColor,
      '--secondary-color': theme.secondaryColor,
      '--accent-color': theme.accentColor,
      '--background-color': isDark ? '#0f172a' : theme.backgroundColor,
      '--text-color': isDark ? '#f1f5f9' : theme.textColor,
      '--card-background': isDark ? '#1e293b' : theme.cardBackground,
      '--border-color': isDark ? '#334155' : theme.borderColor
    };
  }
}