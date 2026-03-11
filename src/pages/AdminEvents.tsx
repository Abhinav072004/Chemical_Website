import { useEffect, useState } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent, type EventUpcoming, type EventPast } from '../api';
import { AdminRoute } from './AdminLayout';

type EventItem = (EventUpcoming | EventPast) & { id?: number; eventType: 'upcoming' | 'past' };

export default function AdminEventsPage() {
  return <AdminRoute><AdminEvents /></AdminRoute>;
}

function AdminEvents() {
  const [upcoming, setUpcoming] = useState<EventUpcoming[]>([]);
  const [past, setPast] = useState<EventPast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState<Partial<EventItem>>({ eventType: 'upcoming' });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const load = async () => {
    setLoading(true); setError('');
    try {
      const data = await getEvents();
      setUpcoming(data.upcoming || []);
      setPast(data.past || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = (eventType: 'upcoming' | 'past') => {
    setEditing(null);
    setForm({ eventType, title: '', date: '', description: '', time: '', location: '', type: '', registrations: 0, maxCapacity: 0, status: '', color: 'bg-blue-500', participants: 0, image: '' });
    setImageFile(null); setShowForm(true);
  };

  const openEdit = (item: EventUpcoming | EventPast, eventType: 'upcoming' | 'past') => {
    setEditing({ ...item, eventType }); setForm({ ...item, eventType }); setImageFile(null); setShowForm(true);
  };

  const closeForm = () => {
    setEditing(null); setForm({}); setImageFile(null); setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.title || !form.date) return;
    setSaving(true); setError('');
    
    try {
      const eventType = form.eventType || 'upcoming';
      const formData = new FormData();
      
      formData.append('eventType', eventType);
      formData.append('title', form.title);
      formData.append('date', form.date);
      if (form.description) formData.append('description', form.description);

      if (eventType === 'upcoming') {
        const up = form as Partial<EventUpcoming>;
        if (up.time) formData.append('time', up.time);
        if (up.location) formData.append('location', up.location);
        if (up.type) formData.append('type', up.type);
        if (up.status) formData.append('status', up.status);
        if (up.color) formData.append('color', up.color);
        if (up.registrations != null) formData.append('registrations', String(up.registrations));
        if (up.maxCapacity != null) formData.append('maxCapacity', String(up.maxCapacity));
      } else {
        const pa = form as Partial<EventPast>;
        if (pa.participants != null) formData.append('participants', String(pa.participants));
      }

      if (imageFile) formData.append('imageFile', imageFile);
      else if (form.image) formData.append('image', form.image);

      if (editing?.id) await updateEvent(editing.id, formData);
      else await createEvent(formData);
      
      closeForm(); load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    try { await deleteEvent(id); load(); } catch (e) { setError('Delete failed'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <div className="flex gap-2">
          <button onClick={() => openCreate('upcoming')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">Add upcoming</button>
          <button onClick={() => openCreate('past')} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium">Add past</button>
        </div>
      </div>
      
      {error && <div className="mb-4 bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm">{error}</div>}
      
      {loading ? <p className="text-gray-600">Loading…</p> : (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <h2 className="px-4 py-3 bg-gray-50 font-semibold text-gray-900">Upcoming</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {upcoming.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.date}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      <button onClick={() => openEdit(row, 'upcoming')} className="text-blue-600 hover:underline mr-3">Edit</button>
                      <button onClick={() => row.id && handleDelete(row.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <h2 className="px-4 py-3 bg-gray-50 font-semibold text-gray-900">Past</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {past.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.date}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      <button onClick={() => openEdit(row, 'past')} className="text-blue-600 hover:underline mr-3">Edit</button>
                      <button onClick={() => row.id && handleDelete(row.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">{editing ? 'Edit event' : 'New event'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select value={form.eventType || 'upcoming'} onChange={(e) => setForm({ ...form, eventType: e.target.value as 'upcoming' | 'past' })} className="w-full border border-gray-300 rounded-lg px-3 py-2" disabled={!!editing}>
                  <option value="upcoming">Upcoming</option><option value="past">Past</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              
              {form.eventType === 'upcoming' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Time</label><input value={form.time || ''} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><input value={form.type || ''} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><input value={form.status || ''} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Registrations</label><input type="number" value={form.registrations ?? ''} onChange={(e) => setForm({ ...form, registrations: parseInt(e.target.value, 10) || 0 })} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Max capacity</label><input type="number" value={form.maxCapacity ?? ''} onChange={(e) => setForm({ ...form, maxCapacity: parseInt(e.target.value, 10) || 0 })} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
                </>
              )}
              
              {form.eventType === 'past' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Participants</label><input type="number" value={form.participants ?? ''} onChange={(e) => setForm({ ...form, participants: parseInt(e.target.value, 10) || 0 })} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Event Image</label>
                    <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white" />
                    {editing && form.image && !imageFile && <p className="text-sm text-gray-500 mt-1">Current image: {form.image.split('/').pop()}</p>}
                  </div>
                </>
              )}
              <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" onClick={closeForm} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}