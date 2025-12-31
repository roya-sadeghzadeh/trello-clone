export const sessionStorage = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    window.sessionStorage.removeItem(key);
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    window.sessionStorage.clear();
  },
};
