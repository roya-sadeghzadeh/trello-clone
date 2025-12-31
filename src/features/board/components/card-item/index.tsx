'use client'
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "../../types/card.types";
import styles from "./styles.module.scss";
import { useBoardStore } from "../../stores/board.store";
import { CommentIcon } from "@/shared/icons/CommentIcon";

interface CardItemProps {
  card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const openCardModal = useBoardStore((state) => state.openCardModal);
  const comments = useBoardStore((state) => state.comments).filter(comment => comment.cardId === card.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.cardItem}
      {...attributes}
      {...listeners}
    >
      <h3 className={styles.title}>{card.title}</h3>

      {/* Comments section */}
      <div className={styles.commentsSection}>
        <button
          className={styles.commentButton}
          onClick={(e) => {
            e.stopPropagation();
            openCardModal(card.id);
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          aria-label="View card details"
        >
          <span className={styles.commentCount}>{`comments (${comments.length})`}</span>
        </button>
      </div>
    </div>
  );
};

export default CardItem;
