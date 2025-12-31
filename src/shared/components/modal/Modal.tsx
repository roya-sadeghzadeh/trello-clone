'use client'
import React, { useEffect } from "react";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import styles from "./styles.module.scss";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
