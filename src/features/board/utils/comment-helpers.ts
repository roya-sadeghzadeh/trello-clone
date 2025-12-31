import type { Comment } from '../types/comment.types';

/**
 * Add a new comment to the array
 */
export const addCommentToArray = (comments: Comment[], comment: Comment): Comment[] => {
  return [...comments, comment];
};

/**
 * Update a comment in the array
 */
export const updateCommentInArray = (
  comments: Comment[],
  commentId: string,
  updates: Partial<Comment>
): Comment[] => {
  return comments.map((comment) =>
    comment.id === commentId ? { ...comment, ...updates } : comment
  );
};

/**
 * Remove a comment from the array
 */
export const removeCommentFromArray = (comments: Comment[], commentId: string): Comment[] => {
  return comments.filter((comment) => comment.id !== commentId);
};

/**
 * Get comments by card ID sorted by creation date
 */
export const getCommentsByCard = (comments: Comment[], cardId: string): Comment[] => {
  return comments
    .filter((comment) => comment.cardId === cardId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};

/**
 * Remove all comments for a specific card
 */
export const removeCommentsByCard = (comments: Comment[], cardId: string): Comment[] => {
  return comments.filter((comment) => comment.cardId !== cardId);
};
