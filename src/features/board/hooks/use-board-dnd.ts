'use client'
import { useBoardStore } from "../stores/board.store";
import { reorderColumns as reorderColumnsHelper } from "../utils/dnd-helpers";

export function useBoardDnd() {
  const columns = useBoardStore((state) => state.columns);
  const cards = useBoardStore((state) => state.cards);
  const reorderColumns = useBoardStore((state) => state.reorderColumns);
  const moveCard = useBoardStore((state) => state.moveCard);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if active item is a column
    const activeColumn = columns.find((col) => col.id === activeId);
    const overColumn = columns.find((col) => col.id === overId);

    // Column reordering
    if (activeColumn && overColumn) {
      const reorderedColumns = reorderColumnsHelper(columns, activeId, overId);
      if (reorderedColumns) {
        reorderColumns(reorderedColumns);
      }
      return;
    }

    // Card reordering/moving
    const activeCard = cards.find((c) => c.id === activeId);
    if (!activeCard) return;

    // Dropping card onto another card
    const overCard = cards.find((c) => c.id === overId);

    if (overCard) {
      const newColumnId = overCard.columnId;
      const cardsInTargetColumn = cards
        .filter((c) => c.columnId === newColumnId)
        .sort((a, b) => a.order - b.order);

      // Find the position of the over card in the target column
      const overCardIndex = cardsInTargetColumn.findIndex((c) => c.id === overCard.id);

      // Insert AFTER the over card (not before)
      const newIndex = ((activeCard.columnId !== overCard.columnId)) ? overCardIndex + 1 : overCardIndex;

      moveCard(activeCard.id, newColumnId, newIndex);
    }
    // Dropping card onto a column (empty or at the end)
    else if (overColumn) {
      const targetColumnId = overColumn.id;
      const cardsInColumn = cards.filter((c) => c.columnId === targetColumnId);
      const newIndex = cardsInColumn.length;
      moveCard(activeCard.id, targetColumnId, newIndex);
    }
  };

  return { handleDragEnd };
}
