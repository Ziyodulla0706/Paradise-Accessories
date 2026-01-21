'use client';

import { useState, useEffect } from 'react';
import { getTheme, setTheme, applyTheme, type Theme } from '@/lib/theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentTheme = getTheme();
    setThemeState(currentTheme);
    applyTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    setTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    mounted,
  };
}
