import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import API_BASE from '../../config/api';

const API = API_BASE;

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl: string;
  avatarPublicId: string;
  published: boolean;
  order: number;
}

const emptyForm = () => ({
  name: '', role: '', company: '', content: '',
  rating: 5, avatarUrl: '', avatarPublicId: '',
  published: true, order: 0,
});

const StarSelector = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button key={s} type="button" onClick={() => onChange(s)}
        className={`text-2xl transition-transform hover:scale-110 ${s <= value ? 'text-amber-400' : 'text-slate-200'}`}>
        ★
      </button>
    ))}
  </div>
);

export const TestimonialsSection = () => {
  const [list, setList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const f = <K extends keyof ReturnType<typeof emptyForm>>(k: K, v: ReturnType<typeof emptyForm>[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch(`${API}/admin/testimonials`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setList(data.data);
    } catch { toast.error('Failed to load testimonials'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleAvatarUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData(); fd.append('image', file);
      const res = await fetch(`${API}/upload`, { method: 'POST', credentials: 'include', body: fd });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Upload failed');
      f('avatarUrl', data.url); f('avatarPublicId', data.publicId);
      toast.success('Photo uploaded');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Upload failed'); }
    finally { setUploading(false); }
  };

  const openNew = () => { setForm(emptyForm()); setEditingId(null); setShowForm(true); };
  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, role: t.role, company: t.company, content: t.content,
      rating: t.rating, avatarUrl: t.avatarUrl, avatarPublicId: t.avatarPublicId,
      published: t.published, order: t.order });
    setEditingId(t._id); setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(emptyForm()); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const url = editingId ? `${API}/admin/testimonials/${editingId}` : `${API}/admin/testimonials`;
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Save failed');
      toast.success(editingId ? 'Testimonial updated' : 'Testimonial added');
      await fetchAll(); closeForm();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirmDeleteId !== id) { setConfirmDeleteId(id); return; }
    try {
      const res = await fetch(`${API}/admin/testimonials/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Delete failed');
      toast.success('Testimonial deleted');
      setList((p) => p.filter((t) => t._id !== id)); setConfirmDeleteId(null);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Testimonials</h1>
          <p className="mt-1 text-sm text-slate-500">{list.filter(t => t.published).length} published · {list.filter(t => !t.published).length} hidden</p>
        </div>
        {!showForm && (
          <button onClick={openNew} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition">
            + Add testimonial
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">{editingId ? 'Edit testimonial' : 'New testimonial'}</h2>
            <button onClick={closeForm} className="text-sm text-slate-400 hover:text-slate-700">✕ Cancel</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {(['name', 'role', 'company'] as const).map((field) => (
                <label key={field} className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700 capitalize">{field}{field === 'name' && <span className="text-red-500"> *</span>}</span>
                  <input value={form[field]} required={field === 'name'} onChange={(e) => f(field, e.target.value)}
                    placeholder={field === 'name' ? 'Jane Smith' : field === 'role' ? 'CEO' : 'Acme Corp'}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
                </label>
              ))}
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Review <span className="text-red-500">*</span></span>
              <textarea value={form.content} required onChange={(e) => f('content', e.target.value)} rows={4}
                placeholder="What they said about ARTecX Solutions…"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
            </label>

            <div className="flex flex-wrap gap-8 items-center">
              <div>
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Rating</span>
                <StarSelector value={form.rating} onChange={(v) => f('rating', v)} />
              </div>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Display order</span>
                <input type="number" value={form.order} onChange={(e) => f('order', Number(e.target.value))} min={0}
                  className="w-24 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
              </div>
            </div>

            {/* Avatar */}
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Photo (optional)</span>
              <p className="mb-2 text-xs text-slate-400">JPG, PNG, WEBP — max 10 MB</p>
              <div className="flex items-center gap-4">
                {form.avatarUrl ? (
                  <img src={form.avatarUrl} alt="Avatar" className="h-16 w-16 rounded-full object-cover border-2 border-slate-200" />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">Photo</div>
                )}
                <div>
                  <input id="avatar-input" type="file" accept="image/*" className="hidden" disabled={uploading}
                    onChange={(e) => { const f2 = e.target.files?.[0]; if (f2) handleAvatarUpload(f2); e.target.value = ''; }} />
                  <button type="button" disabled={uploading} onClick={() => document.getElementById('avatar-input')?.click()}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-50 transition">
                    {uploading ? 'Uploading…' : form.avatarUrl ? 'Change photo' : 'Upload photo'}
                  </button>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" checked={form.published} onChange={(e) => f('published', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-slate-900" />
              <span className="text-sm font-medium text-slate-700">Show on website</span>
            </label>

            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50 transition">
                {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add testimonial'}
              </button>
              <button type="button" onClick={closeForm}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? <div className="py-12 text-center text-sm text-slate-400">Loading…</div>
        : list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-400">
            No testimonials yet — add the first one above.
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((t) => (
              <div key={t._id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                {t.avatarUrl ? (
                  <img src={t.avatarUrl} alt={t.name} loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover border border-slate-200" />
                ) : (
                  <div className="h-12 w-12 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">{t.name[0]}</div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    {t.role && <span className="text-xs text-slate-500">{t.role}{t.company ? ` · ${t.company}` : ''}</span>}
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {t.published ? 'Visible' : 'Hidden'}
                    </span>
                    <span className="text-amber-400 text-sm">{'★'.repeat(t.rating)}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500 line-clamp-1">{t.content}</p>
                </div>
                <div className="flex shrink-0 gap-2 items-center">
                  <button onClick={() => openEdit(t)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-900 hover:bg-slate-50 transition">Edit</button>
                  {confirmDeleteId === t._id ? (
                    <div className="flex gap-1">
                      <button onClick={() => handleDelete(t._id)} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">Confirm</button>
                      <button onClick={() => setConfirmDeleteId(null)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">Keep</button>
                    </div>
                  ) : (
                    <button onClick={() => handleDelete(t._id)}
                      className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition">Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};
