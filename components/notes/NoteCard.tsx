'use client';

import { Note } from '@/types/note';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      personal: 'bg-blue-100 text-blue-800 border-blue-200',
      work: 'bg-green-100 text-green-800 border-green-200',
      ideas: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      todo: 'bg-red-100 text-red-800 border-red-200',
      important: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category?.toLowerCase() || ''] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
          {note.title}
        </h3>
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit note"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3 whitespace-pre-wrap">
        {note.content}
      </p>

      <div className="flex items-center justify-between gap-2">
        {note.category && (
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getCategoryColor(
              note.category
            )}`}
          >
            {note.category}
          </span>
        )}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 ml-auto">
          <Calendar size={12} />
          <time>
            {format(new Date(note.createdAt), 'MMM d, yyyy')}
          </time>
        </div>
      </div>
    </div>
  );
}
