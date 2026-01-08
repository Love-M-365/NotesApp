import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, LogOut, Tag, Search, X } from 'lucide-react';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';
import CategoryModal from './CategoryModal';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!token) return;
    fetchNotes();
    fetchCategories();
  }, [token]);

  useEffect(() => {
    let filtered = notes;

    if (selectedCategory) {
      filtered = filtered.filter(
        (note) => note.categoryId?._id === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotes(filtered);
  }, [notes, selectedCategory, searchQuery]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3001/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Cannot connect to backend. Make sure the NestJS server is running on port 3001.');
      setNotes([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    }
  };

  const handleSaveNote = async (noteData: any) => {
    try {
      const url = editingNote
        ? `http://localhost:3001/notes/${editingNote._id}`
        : 'http://localhost:3001/notes';
      const method = editingNote ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error('Failed to save note');
      }

      await fetchNotes();
      setEditingNote(null);
    } catch (err) {
      console.error('Error saving note:', err);
      setError('Failed to save note. Check the backend connection.');
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const response = await fetch(`http://localhost:3001/notes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      await fetchNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note.');
    }
  };

  const handleSaveCategory = async (categoryData: any) => {
    try {
      const url = editingCategory
        ? `http://localhost:3001/categories/${editingCategory._id}`
        : 'http://localhost:3001/categories';
      const method = editingCategory ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to save category');
      }

      await fetchCategories();
      setEditingCategory(null);
    } catch (err) {
      console.error('Error saving category:', err);
      setError('Failed to save category.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`http://localhost:3001/categories/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      await fetchCategories();
      await fetchNotes();
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <div className="text-red-700 flex-1">
              <p className="font-semibold">Connection Error</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-sm mt-2">
                Start the backend with: <code className="bg-red-100 px-2 py-1 rounded">npm run backend</code>
              </p>
            </div>
            <button
              onClick={() => setError('')}
              className="text-red-400 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Categories
                </h2>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setIsCategoryModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === ''
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  All Notes ({notes.length})
                </button>

                {categories.map((cat) => (
                  <div key={cat._id} className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCategory(cat._id)}
                      className={`flex-1 text-left px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                        selectedCategory === cat._id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <button
                onClick={() => {
                  setEditingNote(null);
                  setIsNoteModalOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                <Plus className="w-5 h-5" />
                New Note
              </button>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery || selectedCategory
                    ? 'No notes found'
                    : 'Create your first note to get started'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={(note) => {
                      setEditingNote(note);
                      setIsNoteModalOpen(true);
                    }}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => {
          setIsNoteModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        note={editingNote}
        categories={categories}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </div>
  );
}
