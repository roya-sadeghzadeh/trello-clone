import type { Column } from '../types/column.types';
import type { Card } from '../types/card.types';

/**
 * Handle column reordering logic
 */
export const reorderColumns = (
  columns: Column[],
  activeId: string,
  overId: string
): Column[] | null => {
  const oldIndex = columns.findIndex((col) => col.id === activeId);
  const newIndex = columns.findIndex((col) => col.id === overId);

  if (oldIndex === newIndex) return null;

  const newColumns = [...columns];
  const [removed] = newColumns.splice(oldIndex, 1);
  newColumns.splice(newIndex, 0, removed);

  // Update order property
  return newColumns.map((col, idx) => ({ ...col, order: idx }));
};

/**
 * Calculate the new index for a card being moved
 */
export const calculateCardNewIndex = (
  cards: Card[],
  activeCard: Card,
  overCard: Card
): { columnId: string; index: number } => {
  const cardsInTargetColumn = cards
    .filter((c) => c.columnId === overCard.columnId)
    .sort((a, b) => a.order - b.order);

  const overCardIndex = cardsInTargetColumn.findIndex((c) => c.id === overCard.id);

  // Insert AFTER the over card when moving between columns
  const newIndex = (activeCard.columnId !== overCard.columnId)
    ? overCardIndex + 1
    : overCardIndex;

  return { columnId: overCard.columnId, index: newIndex };
};

/**
 * Handle card drop logic
 */
export interface CardDropResult {
  cardId: string;
  newColumnId: string;
  index: number;
}

export const handleCardDrop = (
  cards: Card[],
  activeId: string,
  overId: string,
  overColumnId: string | null
): CardDropResult | null => {
  const activeCard = cards.find((c) => c.id === activeId);
  if (!activeCard) return null;

  // Dropping card onto another card
  const overCard = cards.find((c) => c.id === overId);
  if (overCard) {
    const { columnId, index } = calculateCardNewIndex(cards, activeCard, overCard);
    return { cardId: activeCard.id, newColumnId: columnId, index };
  }

  // Dropping card onto a column (empty or at the end)
  if (overColumnId) {
    const cardsInColumn = cards.filter((c) => c.columnId === overColumnId);
    const newIndex = cardsInColumn.length;
    return { cardId: activeCard.id, newColumnId: overColumnId, index: newIndex };
  }

  return null;
};
