'use client'
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { useBoardStore } from "../../stores/board.store";
import { CloseIcon } from "@/shared/icons";
import Button from "@/shared/components/button/Button";
import { Textarea } from "@/shared/components/input/Input";

interface AddCardButtonProps {
  columnId: string;
  cardCount: number;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ columnId, cardCount }) => {
  const addCard = useBoardStore((state) => state.addCard);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleAddCard = () => {
    if (title.trim()) {
      addCard({
        id: `card-${Date.now()}`,
        title,
        columnId,
        order: cardCount,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setTitle("");
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setIsAdding(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleCancel();
      }
    };

    if (isAdding) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isAdding]);

  return isAdding ? (
    <div className={styles.addCardContainer} ref={formRef}>
      <div className={styles.addCardForm}>
        <Textarea
          value={title}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)}
          placeholder="Enter a title for this card..."
          variant="editable"
          autoFocus
          rows={3}
          fullWidth
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddCard();
            }
            if (e.key === "Escape") handleCancel();
          }}
        />
        <div className={styles.actions}>
          <Button className={styles.addButton} onClick={handleAddCard}>
            Create card
          </Button>
          <button className={styles.closeButton} onClick={handleCancel}>
            <CloseIcon  />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <button className={styles.button} onClick={(e) => {
      e.stopPropagation();
      setIsAdding(true)
    }}>
      + Add another card
    </button>
  );
};

export default AddCardButton;
