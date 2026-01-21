'use client';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'paradise-theme';

export function getTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

export function setTheme(theme: Theme) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}

export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') {
    return;
  }

  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Initialize theme on load
if (typeof window !== 'undefined') {
  applyTheme(getTheme());
}
