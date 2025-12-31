'use client'
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { Input, Textarea } from "../input/Input";

export interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  as: "h1" | "h2" | "div" | "span";
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  className?: string;
  inputClassName?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  placeholder = "Enter text...",
  multiline = false,
  maxLength,
  className = "",
  inputClassName = "",
  as = "div"
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const AsComponent = as;

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      } else {
        inputRef.current.setSelectionRange(
          inputRef.current.value.length,
          inputRef.current.value.length
        );
      }
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== value) {
      onSave(trimmed);
    } else {
      setEditValue(value);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    const InputComponent = multiline ? Textarea : Input;

    return (
      <div className={`${styles.editingContainer}`}>
        <InputComponent
          ref={inputRef as any}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${styles.input} ${inputClassName}`}
          rows={multiline ? 3 : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.displayContainer} ${className}`}
      onClick={handleStartEdit}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleStartEdit();
        }
      }}
    >
      {value || <AsComponent className={styles.placeholder}>{placeholder}</AsComponent>}
    </div>
  );
};
