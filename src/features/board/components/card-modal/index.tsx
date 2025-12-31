"use client"
import React, { useState } from "react";
import { useBoardStore } from "../../stores/board.store";
import type { Comment } from "../../types/comment.types";
import Modal from "@/shared/components/modal/Modal";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { CommentIcon } from "@/shared/icons/CommentIcon";
import styles from "./styles.module.scss";
import { Textarea } from "@/shared/components/input/Input";
import Button from "@/shared/components/button/Button";
import { formatDateTime } from "@/shared/utils";

const CardModal: React.FC = () => {
  const [commentText, setCommentText] = useState("");

  const openCardId = useBoardStore((state) => state.openCardId);
  const closeCardModal = useBoardStore((state) => state.closeCardModal);
  const cards = useBoardStore((state) => state.cards);
  const getCommentsByCard = useBoardStore((state) => state.getCommentsByCard);
  const addComment = useBoardStore((state) => state.addComment);
  const updateCard = useBoardStore((state) => state.updateCard);

  const card = cards.find((c) => c.id === openCardId) || null;
  const comments: Comment[] = card ? getCommentsByCard(card.id) : [];

  const handleAddComment = () => {
    if (commentText.trim() && card) {
      addComment({
        id: `comment-${Date.now()}`,
        cardId: card.id,
        text: commentText,
        author: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setCommentText("");
    }
  };

  if (!card) return null;

  return (
    <Modal isOpen={!!openCardId} onClose={closeCardModal}>
      <div className={styles.cardModal}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>{`Comments for "${card.title}"`}</h4>
          <button
            className={styles.closeButton}
            onClick={closeCardModal}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.section}>
            {comments.length > 0 && (
              <ul className={styles.commentsList}>
                {comments.map((comment) => (
                  <li key={comment.id} className={styles.comment}>
                    <div className={styles.commentHeader}>
                        you . {" "}
                        {formatDateTime(comment.createdAt)}
                    </div>
                    {comment.text}
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.addCommentForm}>
              <Textarea
                value={commentText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className={styles.commentTextarea}
                fullWidth
              />
              <Button
                onClick={handleAddComment}
                className={styles.addCommentButton}
              >
                Add comment
              </Button>
            </div>

          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
