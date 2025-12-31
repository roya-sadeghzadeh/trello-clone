import type { Card } from '../types/card.types';

/**
 * Move a card to a new column and position
 */
export const moveCardInArray = (
  cards: Card[],
  cardId: string,
  newColumnId: string,
  newOrder: number
): Card[] => {
  const cardIndex = cards.findIndex((c) => c.id === cardId);
  if (cardIndex === -1) return cards;

  const otherCardsInNewColumn = cards
    .filter((c) => c.columnId === newColumnId && c.id !== cardId)
    .sort((a, b) => a.order - b.order);

  // Reorder cards in the new column
  const updatedOtherCards = otherCardsInNewColumn.map((c, idx) => ({
    ...c,
    order: idx >= newOrder ? idx + 1 : idx,
  }));

  return cards.map((c) => {
    if (c.id === cardId) {
      return { ...c, columnId: newColumnId, order: newOrder };
    }
    const updatedOther = updatedOtherCards.find((oc) => oc.id === c.id);
    return updatedOther || c;
  });
};

/**
 * Get cards by column ID sorted by order
 */
export const getCardsByColumn = (cards: Card[], columnId: string): Card[] => {
  return cards
    .filter((card) => card.columnId === columnId)
    .sort((a, b) => a.order - b.order);
};

/**
 * Remove a card and its associated comments
 */
export const removeCardFromArray = (
  cards: Card[],
  cardId: string
): Card[] => {
  return cards.filter((card) => card.id !== cardId);
};

/**
 * Update a card in the array
 */
export const updateCardInArray = (
  cards: Card[],
  cardId: string,
  updates: Partial<Card>
): Card[] => {
  return cards.map((card) =>
    card.id === cardId ? { ...card, ...updates } : card
  );
};

/**
 * Add a new card to the array
 */
export const addCardToArray = (cards: Card[], card: Card): Card[] => {
  return [...cards, card];
};

/**
 * Reorder cards in the array
 */
export const reorderCardsArray = (cards: Card[]): Card[] => {
  return [...cards];
};
