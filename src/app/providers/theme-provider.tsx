'use client';

import type { ReactNode } from 'react';
import { useThemeStore } from '@/shared/stores/theme.store';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={theme} data-theme={theme}>
      {children}
    </div>
  );
}
