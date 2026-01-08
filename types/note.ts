export interface Note {
  _id: string;
  title: string;
  content: string;
  category?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  category?: string;
}

export interface UpdateNoteInput extends CreateNoteInput {
  _id: string;
}
