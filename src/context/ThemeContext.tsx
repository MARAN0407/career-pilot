import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeTone = 'classic-blue' | 'azure-light' | 'sky-pure';

interface ThemeContextType {
  theme: 'light';
  themeTone: ThemeTone;
  setThemeTone: (tone: ThemeTone) => void;
  isDark: false;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeTone, setThemeTone] = useState<ThemeTone>(() => {
    return (localStorage.getItem('career_pilot_theme_tone') as ThemeTone) || 'classic-blue';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('career_pilot_theme_tone', themeTone);
  }, [themeTone]);

  return (
    <ThemeContext.Provider value={{ theme: 'light', themeTone, setThemeTone, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
