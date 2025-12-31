'use client'
import React, { useState, useRef, useEffect } from "react";
import { useBoardStore } from "../../stores/board.store";
import Button from "@/shared/components/button/Button";
import styles from "./styles.module.scss";
import { Input } from "@/shared/components/input/Input";

interface AddColumnButtonProps {
  columnCount: number;
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ columnCount }) => {
  const addColumn = useBoardStore((state) => state.addColumn);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleAddColumn = () => {
    if (title.trim()) {
      addColumn({
        id: `col-${Date.now()}`,
        title,
        order: columnCount,
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
    <div className={styles.addColumnContainer} ref={formRef}>
      <div className={styles.addColumnForm}>
      <Input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Enter list title..."
        variant="editable"
        autoFocus
        fullWidth
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") handleAddColumn();
          if (e.key === "Escape") handleCancel();
        }}
      />
      <div className={styles.actions}>
        <Button onClick={handleAddColumn}>Add list</Button>
        <Button onClick={handleCancel} variant="secondary">
          <span className={styles.closeIcon}>×</span>
        </Button>
      </div>
    </div>
    </div>
  ) : (
    <div className={styles.addColumnButtonContainer}>
      <button className={styles.button} onClick={() => setIsAdding(true)}>
      + Add another list
    </button>
    </div>
  );
};

export default AddColumnButton;
