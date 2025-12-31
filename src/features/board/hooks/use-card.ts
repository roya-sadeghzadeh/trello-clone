import { useBoardStore } from '../stores/board.store';

export function useCard() {
  const cards = useBoardStore((state) => state.cards);
  const addCard = useBoardStore((state) => state.addCard);
  const updateCard = useBoardStore((state) => state.updateCard);
  const removeCard = useBoardStore((state) => state.removeCard);

  return { cards, addCard, updateCard, removeCard };
}
