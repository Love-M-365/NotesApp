'use client';

import { Note } from '@/types/note';
import NoteCard from './NoteCard';
import { FileText } from 'lucide-react';

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  selectedCategory?: string;
}

export default function NotesList({
  notes,
  onEdit,
  onDelete,
  selectedCategory,
}: NotesListProps) {
  const filteredNotes = selectedCategory
    ? notes.filter(
        (note) => note.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : notes;

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <FileText size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {selectedCategory ? 'No notes in this category' : 'No notes yet'}
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          {selectedCategory
            ? 'Try selecting a different category or create a new note.'
            : 'Get started by creating your first note using the button above.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {filteredNotes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
