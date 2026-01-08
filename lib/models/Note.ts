import mongoose, { Schema, Model } from 'mongoose';

export interface INote {
  _id: string;
  title: string;
  content: string;
  category?: string;
  userId: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    category: {
      type: String,
      default: '',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.index({ userId: 1, createdAt: -1 });

let Note: Model<INote>;

try {
  Note = mongoose.model<INote>('Note');
} catch {
  Note = mongoose.model<INote>('Note', NoteSchema);
}

export default Note;
