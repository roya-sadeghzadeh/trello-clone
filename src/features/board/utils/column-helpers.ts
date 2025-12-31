import type { Column } from '../types/column.types';
import type { Card } from '../types/card.types';

/**
 * Update a column in the array
 */
export const updateColumnInArray = (
  columns: Column[],
  columnId: string,
  updates: Partial<Column>
): Column[] => {
  return columns.map((col) =>
    col.id === columnId ? { ...col, ...updates } : col
  );
};

/**
 * Remove a column and its associated cards
 */
export const removeColumnFromArray = (
  columns: Column[],
  cards: Card[],
  columnId: string
): { columns: Column[]; cards: Card[] } => {
  return {
    columns: columns.filter((col) => col.id !== columnId),
    cards: cards.filter((card) => card.columnId !== columnId),
  };
};

/**
 * Add a new column to the array
 */
export const addColumnToArray = (columns: Column[], column: Column): Column[] => {
  return [...columns, column];
};

/**
 * Reorder columns in the array
 */
export const reorderColumnsArray = (columns: Column[]): Column[] => {
  return [...columns];
};

/**
 * Update column order property
 */
export const updateColumnOrder = (columns: Column[]): Column[] => {
  return columns.map((col, idx) => ({ ...col, order: idx }));
};
