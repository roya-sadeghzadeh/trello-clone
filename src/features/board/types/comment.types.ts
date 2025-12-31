export interface Comment {
  id: string;
  cardId: string;
  text: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentDTO {
  cardId: string;
  text: string;
  author: string;
}

export interface UpdateCommentDTO {
  id: string;
  text?: string;
}
