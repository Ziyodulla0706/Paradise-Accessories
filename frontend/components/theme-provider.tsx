'use client';

import { useEffect } from 'react';
import { applyTheme, getTheme } from '@/lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply theme on mount
    applyTheme(getTheme());
  }, []);

  return <>{children}</>;
}
