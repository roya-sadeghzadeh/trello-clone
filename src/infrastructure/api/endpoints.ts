export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  // Board endpoints
  BOARDS: {
    LIST: '/boards',
    GET: (id: string) => `/boards/${id}`,
    CREATE: '/boards',
    UPDATE: (id: string) => `/boards/${id}`,
    DELETE: (id: string) => `/boards/${id}`,
  },
  // Column endpoints
  COLUMNS: {
    CREATE: '/columns',
    UPDATE: (id: string) => `/columns/${id}`,
    DELETE: (id: string) => `/columns/${id}`,
    REORDER: '/columns/reorder',
  },
  // Card endpoints
  CARDS: {
    CREATE: '/cards',
    UPDATE: (id: string) => `/cards/${id}`,
    DELETE: (id: string) => `/cards/${id}`,
    MOVE: '/cards/move',
  },
} as const;
