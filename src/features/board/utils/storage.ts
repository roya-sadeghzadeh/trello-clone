import type { Column } from '../types/column.types';
import type { Card } from '../types/card.types';
import type { Comment } from '../types/comment.types';

const STORAGE_KEY = 'board-storage';

interface StoredState {
  title: string;
  columns: Column[];
  cards: Card[];
  comments: Comment[];
}

/**
 * Load state from localStorage
 */
export const loadState = (): StoredState | undefined => {
  if (typeof window === 'undefined') return undefined;

  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

/**
 * Save state to localStorage (excluding temporary UI state)
 */
export const saveState = (state: Partial<StoredState>): void => {
  if (typeof window === 'undefined') return;

  try {
    // Only persist data, not temporary UI state
    const stateToSave: StoredState = {
      title: state.title || '',
      columns: state.columns || [],
      cards: state.cards || [],
      comments: state.comments || [],
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

/**
 * Convert date strings back to Date objects after deserialization
 */
export const deserializeState = (state: any): StoredState | null => {
  if (!state) return null;

  return {
    ...state,
    columns: state.columns?.map((col: Column) => ({
      ...col,
      createdAt: new Date(col.createdAt),
      updatedAt: new Date(col.updatedAt),
    })) || [],
    cards: state.cards?.map((card: Card) => ({
      ...card,
      createdAt: new Date(card.createdAt),
      updatedAt: new Date(card.updatedAt),
    })) || [],
    comments: state.comments?.map((comment: Comment) => ({
      ...comment,
      createdAt: new Date(comment.createdAt),
      updatedAt: new Date(comment.updatedAt),
    })) || [],
  };
};

/**
 * Create default board state
 * This is called only on client side to avoid hydration mismatch
 */
export const createDefaultState = (): StoredState => {
  const now = new Date();

  return {
    title: 'Demo Board',
    columns: [
      {
        id: 'column-1',
        title: 'To Do',
        order: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'column-2',
        title: 'In Progress',
        order: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'column-3',
        title: 'Done',
        order: 2,
        createdAt: now,
        updatedAt: now,
      }
    ],
    cards: [
      {
        id: 'card-1',
        columnId: 'column-1',
        order: 0,
        title: 'Create interview Kanban',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'card-2',
        columnId: 'column-1',
        order: 1,
        title: 'Review Drag & Drop',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'card-3',
        columnId: 'column-2',
        order: 0,
        title: 'Set up Next.js project',
        createdAt: now,
        updatedAt: now,
      },
    ],
    comments: []
  };
};
