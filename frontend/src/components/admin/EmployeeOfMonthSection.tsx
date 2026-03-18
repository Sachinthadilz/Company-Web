import { useState, useEffect, useCallback } from 'react';

interface Employee {
  _id: string;
  name: string;
  role: string;
  bio: string;
  quote: string;
  photoUrl: string;
  photoPublicId: string;
  month: number;
  year: number;
  active: boolean;
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

import API_BASE from '../../config/api';

const API = API_BASE;
const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth() + 1;

const empty = (): Omit<Employee, '_id'> => ({
  name: '', role: '', bio: '', quote: '',
  photoUrl: '', photoPublicId: '',
  month: CURRENT_MONTH, year: CURRENT_YEAR, active: true,
});

export const EmployeeOfMonthSection = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const field = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch(`${API}/employee-of-month`);
      const data = await res.json();
      if (data.success) setEmployees(data.data);
    } catch {
      setError('Failed to load records');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handlePhotoUpload = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${API}/upload`, { method: 'POST', credentials: 'include', body: fd });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Upload failed');
      field('photoUrl', data.url);
      field('photoPublicId', data.publicId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const openNew = () => { setForm(empty()); setEditingId(null); setShowForm(true); };
  const openEdit = (emp: Employee) => {
    setForm({ name: emp.name, role: emp.role, bio: emp.bio, quote: emp.quote,
      photoUrl: emp.photoUrl, photoPublicId: emp.photoPublicId,
      month: emp.month, year: emp.year, active: emp.active });
    setEditingId(emp._id);
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(empty()); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = editingId
        ? `${API}/admin/employee-of-month/${editingId}`
        : `${API}/admin/employee-of-month`;
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Save failed');
      await fetchAll();
      closeForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirmDeleteId !== id) { setConfirmDeleteId(id); return; }
    try {
      const res = await fetch(`${API}/admin/employee-of-month/${id}`, {
        method: 'DELETE', credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Delete failed');
      setEmployees((prev) => prev.filter((e) => e._id !== id));
      setConfirmDeleteId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Employee Of The Month</h1>
          <p className="mt-1 text-sm text-slate-500">
            {employees.length} record{employees.length !== 1 ? 's' : ''} — shown on the About page
          </p>
        </div>
        {!showForm && (
          <button onClick={openNew}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition">
            + Add employee
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* ── Form ── */}
      {showForm && (
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">{editingId ? 'Edit record' : 'New Employee Of The Month'}</h2>
            <button onClick={closeForm} className="text-sm text-slate-400 hover:text-slate-700">✕ Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Month / Year row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Month <span className="text-red-500">*</span></span>
                <select value={form.month} onChange={(e) => field('month', +e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900">
                  {MONTH_NAMES.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Year <span className="text-red-500">*</span></span>
                <input type="number" value={form.year} min={2000} max={2100}
                  onChange={(e) => field('year', +e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
              </label>
            </div>

            {/* Name / Role */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Full name <span className="text-red-500">*</span></span>
                <input value={form.name} onChange={(e) => field('name', e.target.value)} required
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Role <span className="text-red-500">*</span></span>
                <input value={form.role} onChange={(e) => field('role', e.target.value)} required
                  placeholder="e.g. Senior Developer"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
              </label>
            </div>

            {/* Bio */}
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Bio / Achievement</span>
              <textarea value={form.bio} onChange={(e) => field('bio', e.target.value)} rows={3}
                placeholder="Why are they employee of the month? Key achievement…"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 min-h-20" />
            </label>

            {/* Quote */}
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Quote (optional)</span>
              <input value={form.quote} onChange={(e) => field('quote', e.target.value)}
                placeholder='"A short motivational quote from them"'
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
            </label>

            {/* Photo upload */}
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Photo</span>
              <p className="mb-2 text-xs text-slate-400">JPG, PNG, WEBP — max 10 MB</p>
              <div className="flex items-center gap-4">
                {form.photoUrl ? (
                  <img src={form.photoUrl} alt="Preview"
                    className="h-20 w-20 rounded-2xl object-cover border border-slate-200" />
                ) : (
                  <div className="h-20 w-20 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
                    No photo
                  </div>
                )}
                <div>
                  <input id="eom-photo-input" type="file" accept="image/*" className="hidden"
                    disabled={uploading}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); e.target.value = ''; }} />
                  <button type="button" disabled={uploading}
                    onClick={() => document.getElementById('eom-photo-input')?.click()}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-50 transition">
                    {uploading ? 'Uploading…' : form.photoUrl ? 'Change photo' : 'Upload photo'}
                  </button>
                </div>
              </div>
            </div>

            {/* Active toggle */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" checked={form.active} onChange={(e) => field('active', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-slate-900" />
              <span className="text-sm font-medium text-slate-700">Show on website</span>
            </label>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50 transition">
                {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create record'}
              </button>
              <button type="button" onClick={closeForm}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── List ── */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-400">Loading…</div>
      ) : employees.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-400">
          No records yet — add your first employee above.
        </div>
      ) : (
        <div className="space-y-3">
          {employees.map((emp) => (
            <div key={emp._id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              {emp.photoUrl ? (
                <img src={emp.photoUrl} alt={emp.name}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover border border-slate-100" />
              ) : (
                <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xl font-bold">
                  {emp.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-slate-900">{emp.name}</p>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{emp.role}</span>
                  <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-semibold">
                    {MONTH_NAMES[emp.month - 1]} {emp.year}
                  </span>
                  {!emp.active && (
                    <span className="rounded-full bg-red-50 text-red-400 px-2 py-0.5 text-xs">Hidden</span>
                  )}
                </div>
                {emp.bio && <p className="mt-1 text-xs text-slate-500 line-clamp-1">{emp.bio}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => openEdit(emp)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-900 hover:bg-slate-50 transition">
                  Edit
                </button>
                {confirmDeleteId === emp._id ? (
                  <div className="flex gap-1">
                    <button onClick={() => handleDelete(emp._id)}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">
                      Confirm
                    </button>
                    <button onClick={() => setConfirmDeleteId(null)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                      Keep
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleDelete(emp._id)}
                    className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
