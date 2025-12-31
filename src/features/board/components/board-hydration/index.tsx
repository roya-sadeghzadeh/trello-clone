'use client';
import { useEffect } from 'react';
import { useBoardStore } from '../../stores/board.store';

export function BoardHydration() {
  const hydrate = useBoardStore((state) => state.hydrate);
  const _hasHydrated = useBoardStore((state) => state._hasHydrated);

  useEffect(() => {
    if (!_hasHydrated) {
      hydrate();
    }
  }, [_hasHydrated, hydrate]);

  return null;
}
