import { useEffect, useState } from 'react';
import { Mail, GraduationCap, MapPin, Phone, Link2 } from 'lucide-react';
import { getStudents, createStudent, updateStudent, deleteStudent, type Student } from '../api'; // <-- PATH IS FIXED
import { AdminRoute } from './AdminLayout';

// Student Roles dropdown values from image_10.png
const ROLES = ['UG', 'PHD'];

const emptyStudent = (): Partial<Student> => ({
  name: '', designation: '', homePageURL: '', email: '',
  phone: '', addressLocation: '', role: 'UG', order: 1, image: '',
});

export default function AdminStudentPage() {
  return <AdminRoute><AdminStudent /></AdminRoute>;
}

function AdminStudent() {
  const [list, setList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false); 
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState<Partial<Student>>(emptyStudent());
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null); setForm(emptyStudent()); setImageFile(null); setShowModal(true); 
  };

  const openEdit = (row: Student) => {
    setEditing(row); setForm({ ...row });
    setImageFile(null); setShowModal(true); 
  };

  const closeModal = () => {
    setEditing(null); setForm(emptyStudent()); setImageFile(null); setShowModal(false); 
  };

  const handleSave = async () => {
    if (!form.name || !form.email || !form.designation) {
      alert("Name, Email, and Designation are required!");
      return;
    }
    setSaving(true);
    
    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append('name', form.name);
      formData.append('designation', form.designation);
      formData.append('homePageURL', form.homePageURL || '');
      formData.append('email', form.email);
      formData.append('phone', form.phone || '');
      formData.append('addressLocation', form.addressLocation || '');
      formData.append('role', form.role || 'UG');
      formData.append('order', String(form.order || 1));

      // Append file handling
      if (imageFile) {
        formData.append('imageFile', imageFile);
      } else if (form.image) {
        formData.append('image', form.image);
      }

      if (editing?.id) {
        await updateStudent(editing.id, formData);
      } else {
        await createStudent(formData);
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
    if (!confirm('Are you sure you want to delete this student entry?')) return;
    try { await deleteStudent(id); load(); } catch (e) { alert('Delete failed'); }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
        <button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow">
          Add student
        </button>
      </div>

      {error && <div className="mb-4 bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm border border-red-200">{error}</div>}

      {loading ? <p className="text-gray-500 text-center py-8">Loading students database...</p> : (
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name / ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {list.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No student entries found in live database.</td></tr>
              ) : (
                list.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div>{row.name}</div>
                      <div className="text-xs text-orange-600 font-mono mt-1">{row.designation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{row.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center"><Mail className="h-3 w-3 mr-1.5 text-blue-600"/>{row.email}</div>
                      {row.phone && <div className="flex items-center text-xs mt-1"><Phone className="h-3 w-3 mr-1.5 text-blue-600"/>{row.phone}</div>}
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
              {editing ? 'Edit Student Entry' : 'Add New Student'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input required value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input required type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation / ID *</label>
                <input required value={form.designation || ''} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g. BTech 2024 / PhD Roll No" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={form.role || 'UG'} onChange={(e) => setForm({ ...form, role: e.target.value as 'UG' | 'PHD' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Home Page URL</label>
                <input value={form.homePageURL || ''} onChange={(e) => setForm({ ...form, homePageURL: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="http://profile.iiti.ac.in" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fix Order</label>
                <input type="number" value={form.order || 1} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value, 10) || 1 })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address / Contact Details</label>
                <textarea value={form.addressLocation || ''} onChange={(e) => setForm({ ...form, addressLocation: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Image</label>
                <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white" />
                {editing && form.image && !imageFile && <p className="text-sm text-gray-500 mt-1">Current image: {form.image.split('/').pop()}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
              {/* THE FIX IS HERE ON THE NEXT LINE: onClick={closeModal} */}
              <button type="button" onClick={closeModal} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
                {saving ? 'Saving...' : 'Save Student Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}