'use client'
import React, { useRef, useState } from "react";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { MenuIcon } from "@/shared/icons/MenuIcon";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { BackIcon } from "@/shared/icons/BackIcon";
import styles from "./styles.module.scss";
import { useBoardStore } from "../../stores/board.store";
import Button from "@/shared/components/button/Button";

type DeleteItemType = 'column' | 'cards' | null;

interface ColumnMenuProps {
  columnId: string;
}

const ColumnMenu: React.FC<ColumnMenuProps> = ({ columnId }) => {
  const [deleteItemType, setDeleteItemType] = useState<DeleteItemType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const removeColumn = useBoardStore((state) => state.removeColumn);
  const cards = useBoardStore((state) => state.cards)
    .filter(card => card.columnId === columnId)
    .sort((a, b) => a.order - b.order);
  const removeCard = useBoardStore((state) => state.removeCard);

  useOutsideClick(menuRef, () => {
    setIsOpen(false);
    setDeleteItemType(null);
  }, isOpen);

  const handleDeleteList = () => {
    setDeleteItemType('column');
  };

  const handleDeleteAllCards = () => {
    setDeleteItemType('cards');
  };

  const handleConfirmDeleteList = () => {
    removeColumn(columnId);
    setDeleteItemType(null);
    setIsOpen(false);
  };

  const handleConfirmDeleteCards = () => {
    cards.forEach((card) => {
      removeCard(card.id);
    });
    setDeleteItemType(null);
    setIsOpen(false);
  };

  const handleBack = () => {
    setDeleteItemType(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setDeleteItemType(null);
  };

  const getMenuHeaderTitle = (): string => {
    if (deleteItemType === 'column') {
      return 'Delete list';
    } else if (deleteItemType === 'cards') {
      return 'Delete all cards';
    }
    return 'List Actions';
  };

  const renderConfirmDialog = (description: string, actionText:string, confirmAction: () => void) => {
    return (
      <div className={styles.confirmDialog}>
        <p>{description}</p>
        <div className={styles.dialogActions}>
          <Button onClick={confirmAction} variant="danger">
            {actionText}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <MenuIcon />
      </button>

      {isOpen && (
        <div className={styles.menuDropdown}>
          <div className={styles.menuHeader}>
            <button
              onClick={handleBack}
              className={styles.backButton}
              aria-label="Go back"
              disabled={!deleteItemType}
            >
              {deleteItemType && <BackIcon />}
            </button>
            <h3 className={styles.menuTitle}>
              {getMenuHeaderTitle()}
            </h3>
            <button
              onClick={handleClose}
              className={styles.closeButton}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div className={styles.menuContent}>
            {deleteItemType === 'cards' ? renderConfirmDialog("This will remove all the cards in this list from the board.","Delete all", handleConfirmDeleteCards)
              : deleteItemType === 'column' ? (
                renderConfirmDialog("All actions will be removed from the activity feed and you won't be able to re-open the list. There is no undo.","Delete list", handleConfirmDeleteList)
              ) : (
                <ul>
                  <li
                    className={styles.menuItem}
                    onClick={handleDeleteList}
                  >
                    Delete list
                  </li>
                  <li
                    className={styles.menuItem}
                    onClick={handleDeleteAllCards}
                  >
                    Delete all cards in list
                  </li>
                </ul>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnMenu;
