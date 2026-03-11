import { useState, useEffect } from 'react';
import { getNews, createNews, deleteNews } from '../api';
import { Trash2, Plus } from 'lucide-react';

export default function AdminNews() {
  const [news, setNews] = useState<{id: number, text: string}[]>([]);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      console.error("Failed to load news", error);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    try {
      await createNews({ text: newText });
      setNewText('');
      loadNews();
    } catch (error) {
      console.error("Failed to add news", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this news item?")) return;
    try {
      await deleteNews(id);
      loadNews();
    } catch (error) {
      console.error("Failed to delete news", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Latest News Ticker</h2>
      
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 flex gap-4">
        <input 
          type="text" 
          placeholder="Enter a new announcement headline..." 
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:blue-500 outline-none"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add News
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {news.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">No news items found. Add one above!</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {news.map((item) => (
              <li key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-gray-800 font-medium">{item.text}</span>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}