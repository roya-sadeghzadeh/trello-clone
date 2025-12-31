export interface Column {
  id: string;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateColumnDTO {
  title: string;
}

export interface UpdateColumnDTO {
  id: string;
  title?: string;
  order?: number;
}
