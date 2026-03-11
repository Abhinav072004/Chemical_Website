import { useEffect, useState } from 'react';
import { getFaculty, createFaculty, updateFaculty, deleteFaculty, type FacultyMember } from '../api';
import { AdminRoute } from './AdminLayout';

const CATEGORIES = ['core', 'visiting', 'associate', 'advisory', 'hod', 'admin', 'technical', 'working', 'convenor'];

const emptyFaculty = (): Partial<FacultyMember> => ({
  name: '', position: 'Assistant Professor', education: '', research: [],
  email: '', phone: '', office: '', homePage: '', publications: '', experience: '', image: '', category: 'core',
});

export default function AdminFacultyPage() {
  return <AdminRoute><AdminFaculty /></AdminRoute>;
}

function AdminFaculty() {
  const [list, setList] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [editing, setEditing] = useState<FacultyMember | null>(null);
  const [form, setForm] = useState<Partial<FacultyMember>>(emptyFaculty());
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getFaculty();
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null); setForm(emptyFaculty()); setImageFile(null); setShowModal(true); 
  };

  const openEdit = (row: FacultyMember) => {
    setEditing(row); setForm({ ...row, research: row.research ? [...row.research] : [] });
    setImageFile(null); setShowModal(true); 
  };

  const closeModal = () => {
    setEditing(null); setForm(emptyFaculty()); setImageFile(null); setShowModal(false); 
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      alert("Name and Email are required!");
      return;
    }
    setSaving(true);
    
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('position', form.position || '');
      formData.append('education', form.education || '');
      formData.append('email', form.email);
      formData.append('phone', form.phone || '');
      formData.append('office', form.office || '');
      formData.append('homePage', form.homePage || '');
      formData.append('experience', form.experience || '');
      formData.append('category', form.category || 'core');
      
      if (form.publications != null) formData.append('publications', String(form.publications));

      const researchList = Array.isArray(form.research) ? form.research : [];
      researchList.forEach(item => formData.append('research[]', item));

      if (imageFile) {
        formData.append('imageFile', imageFile);
      } else if (form.image) {
        formData.append('image', form.image);
      }

      if (editing?.id) {
        await updateFaculty(editing.id, formData);
      } else {
        await createFaculty(formData);
      }
      
      closeModal(); 
      load();       
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this faculty member?')) return;
    try { await deleteFaculty(id); load(); } catch (e) { alert('Delete failed'); }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Faculty</h1>
        <button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow">
          Add faculty
        </button>
      </div>

      {error && <div className="mb-4 bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm border border-red-200">{error}</div>}

      {loading ? <p className="text-gray-500 text-center py-8">Loading faculty...</p> : (
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {list.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No faculty members found.</td></tr>
              ) : (
                list.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{row.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => openEdit(row)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                      <button onClick={() => row.id && handleDelete(row.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editing ? 'Edit Faculty Member' : 'Add New Faculty'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input required value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input value={form.position || ''} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={form.category || 'core'} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                <input value={form.education || ''} onChange={(e) => setForm({ ...form, education: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input required type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Image</label>
                <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white" />
                {editing && form.image && !imageFile && <p className="text-sm text-gray-500 mt-1">Current image: {form.image.split('/').pop()}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Research Interests (one per line)</label>
                <textarea value={(form.research || []).join('\n')} onChange={(e) => setForm({ ...form, research: e.target.value.split('\n') })} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
              <button type="button" onClick={closeModal} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Faculty'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}