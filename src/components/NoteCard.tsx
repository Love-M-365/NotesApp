import { Trash2, Edit } from 'lucide-react';

interface NoteCardProps {
  note: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    categoryId?: {
      _id: string;
      name: string;
      color: string;
    };
  };
  onEdit: (note: any) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1">{note.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {note.categoryId && (
        <div className="mb-3">
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: note.categoryId.color }}
          >
            {note.categoryId.name}
          </span>
        </div>
      )}

      <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>

      <div className="text-xs text-gray-400">
        Updated {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
