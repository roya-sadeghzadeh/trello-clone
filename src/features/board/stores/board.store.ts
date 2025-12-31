import { create } from 'zustand';
import type { Column } from '../types/column.types';
import type { Card } from '../types/card.types';
import type { Comment } from '../types/comment.types';
import { loadState, saveState, deserializeState, createDefaultState } from '../utils/storage';
import {
  moveCardInArray,
  getCardsByColumn,
  removeCardFromArray,
  updateCardInArray,
  addCardToArray,
  reorderCardsArray,
} from '../utils/card-helpers';
import {
  updateColumnInArray,
  removeColumnFromArray,
  addColumnToArray,
} from '../utils/column-helpers';
import {
  addCommentToArray,
  updateCommentInArray,
  removeCommentFromArray,
  getCommentsByCard,
  removeCommentsByCard,
} from '../utils/comment-helpers';

export interface BoardState {
  title: string;
  columns: Column[];
  cards: Card[];
  comments: Comment[];
  openCardId: string | null;
  activeDraggingId: string | null;
  _hasHydrated: boolean;
}

export interface BoardActions {
  hydrate: () => void;
  updateBoardTitle: (title: string) => void;

  // Column actions
  setColumns: (columns: Column[]) => void;
  addColumn: (column: Column) => void;
  updateColumn: (id: string, updates: Partial<Column>) => void;
  removeColumn: (id: string) => void;
  reorderColumns: (columns: Column[]) => void;

  // Card actions
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  removeCard: (id: string) => void;
  reorderCards: (cards: Card[]) => void;
  moveCard: (cardId: string, newColumnId: string, newOrder: number) => void;
  getCardsByColumn: (columnId: string) => Card[];
  openCardModal: (cardId: string) => void;
  closeCardModal: () => void;

  // Comment actions
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (id: string, updates: Partial<Comment>) => void;
  removeComment: (id: string) => void;
  getCommentsByCard: (cardId: string) => Comment[];

  // Drag and drop actions
  setActiveDraggingId: (id: string | null) => void;
}

export type BoardStore = BoardState & BoardActions;

export const useBoardStore = create<BoardStore>((set, get) => {
  return {
  // State - Initialize with empty state for SSR
  title: "Demo Board",
  columns: [],
  cards: [],
  comments: [],
  openCardId: null,
  activeDraggingId: null,
  _hasHydrated: false,

  hydrate: () => {
    const persistedState = loadState();
    console.log('Hydrating board store with persisted state:', persistedState);
    const initialState = deserializeState(persistedState);
    const defaultState = createDefaultState();

    set({
      title: initialState?.title || defaultState.title,
      columns: initialState?.columns?.length ? initialState.columns : defaultState.columns,
      cards: initialState?.cards?.length ? initialState.cards : defaultState.cards,
      comments: initialState?.comments || defaultState.comments,
      _hasHydrated: true,
    });
  },

  updateBoardTitle: (title) => {
    set({ title });
    const state = get();
    if (state._hasHydrated) {
      saveState(state);
    }
  },

  // Column actions
  setColumns: (columns) => {
    set({ columns });
    const state = get();
    if (state._hasHydrated) {
      saveState(state);
    }
  },

  addColumn: (column) => {
    set((state) => ({
      columns: addColumnToArray(state.columns, column),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  updateColumn: (id, updates) => {
    set((state) => ({
      columns: updateColumnInArray(state.columns, id, updates),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  removeColumn: (id) => {
    set((state) => {
      const { columns, cards } = removeColumnFromArray(state.columns, state.cards, id);
      return { columns, cards };
    });
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  reorderColumns: (columns) => {
    set({ columns });
    const state = get();
    if (state._hasHydrated) {
      saveState(state);
    }
  },

  // Card actions
  setCards: (cards) => {
    set({ cards });
    const state = get();
    if (state._hasHydrated) {
      saveState(state);
    }
  },

  addCard: (card) => {
    set((state) => ({
      cards: addCardToArray(state.cards, card),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  updateCard: (id, updates) => {
    set((state) => ({
      cards: updateCardInArray(state.cards, id, updates),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  removeCard: (id) => {
    set((state) => ({
      cards: removeCardFromArray(state.cards, id),
      comments: removeCommentsByCard(state.comments, id),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  reorderCards: (cards) => {
    set({ cards: reorderCardsArray(cards) });
    const state = get();
    if (state._hasHydrated) {
      saveState(state);
    }
  },

  moveCard: (cardId, newColumnId, newOrder) => {
    set((state) => ({
      cards: moveCardInArray(state.cards, cardId, newColumnId, newOrder),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  getCardsByColumn: (columnId) => {
    return getCardsByColumn(get().cards, columnId);
  },

  openCardModal: (cardId) => {
    set({ openCardId: cardId });
    const state = get();
    if (state._hasHydrated) {
      saveState(state);
    }
  },

  closeCardModal: () => {
    set({ openCardId: null });
    const state = get();
    if (state._hasHydrated) {
      saveState(state);
    }
  },

  // Comment actions
  setComments: (comments) => {
    set({ comments });
    const state = get();
    if (state._hasHydrated) {
      saveState(state);
    }
  },

  addComment: (comment) => {
    set((state) => ({
      comments: addCommentToArray(state.comments, comment),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  updateComment: (id, updates) => {
    set((state) => ({
      comments: updateCommentInArray(state.comments, id, updates),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  removeComment: (id) => {
    set((state) => ({
      comments: removeCommentFromArray(state.comments, id),
    }));
    const newState = get();
    if (newState._hasHydrated) {
      saveState(newState);
    }
  },

  getCommentsByCard: (cardId) => {
    return getCommentsByCard(get().comments, cardId);
  },

  setActiveDraggingId: (id) => {
    set({ activeDraggingId: id });
  },
}
})

