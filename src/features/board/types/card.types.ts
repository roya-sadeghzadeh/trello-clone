export interface Card {
  id: string;
  title: string;
  columnId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCardDTO {
  title: string;
  columnId: string;
}

export interface UpdateCardDTO {
  id: string;
  title?: string;
  columnId?: string;
  order?: number;
}
