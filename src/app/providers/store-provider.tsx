'use client';

import type { ReactNode } from 'react';

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  // Initialize store providers here if needed
  return <>{children}</>;
}
