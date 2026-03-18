import { useState, useEffect, useCallback } from 'react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  coverPublicId: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

import API_BASE from '../../config/api';

const API = API_BASE;

const emptyForm = () => ({
  title: '', slug: '', excerpt: '', content: '',
  coverUrl: '', coverPublicId: '',
  author: 'ARTecX Team', tags: [] as string[],
  published: false,
});

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [tagInput, setTagInput] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const f = <K extends keyof ReturnType<typeof emptyForm>>(
    key: K, value: ReturnType<typeof emptyForm>[K]
  ) => setForm((p) => ({ ...p, [key]: value }));

  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch(`${API}/admin/blogs`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch { setError('Failed to load posts'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const fetchFull = async (id: string) => {
    const res = await fetch(`${API}/admin/blogs/${id}`, { credentials: 'include' });
    const data = await res.json();
    return data.data as Blog;
  };

  const handleCoverUpload = async (file: File) => {
    setUploading(true); setError('');
    try {
      const fd = new FormData(); fd.append('image', file);
      const res = await fetch(`${API}/upload`, { method: 'POST', credentials: 'include', body: fd });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Upload failed');
      f('coverUrl', data.url); f('coverPublicId', data.publicId);
    } catch (e) { setError(e instanceof Error ? e.message : 'Upload failed'); }
    finally { setUploading(false); }
  };

  const openNew = () => { setForm(emptyForm()); setEditingId(null); setTagInput(''); setShowForm(true); };
  const openEdit = async (b: Blog) => {
    const full = await fetchFull(b._id);
    setForm({ title: full.title, slug: full.slug, excerpt: full.excerpt, content: full.content,
      coverUrl: full.coverUrl, coverPublicId: full.coverPublicId,
      author: full.author, tags: [...full.tags], published: full.published });
    setEditingId(b._id); setTagInput(''); setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(emptyForm()); };

  const addTag = (t: string) => {
    const v = t.trim();
    if (v && !form.tags.includes(v)) { f('tags', [...form.tags, v]); setTagInput(''); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const url = editingId ? `${API}/admin/blogs/${editingId}` : `${API}/admin/blogs`;
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Save failed');
      await fetchAll(); closeForm();
    } catch (e) { setError(e instanceof Error ? e.message : 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirmDeleteId !== id) { setConfirmDeleteId(id); return; }
    try {
      const res = await fetch(`${API}/admin/blogs/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Delete failed');
      setBlogs((p) => p.filter((b) => b._id !== id)); setConfirmDeleteId(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Delete failed'); }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            {blogs.filter(b => b.published).length} published · {blogs.filter(b => !b.published).length} drafts
          </p>
        </div>
        {!showForm && (
          <button onClick={openNew}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition">
            + New post
          </button>
        )}
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {/* ── Form ── */}
      {showForm && (
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">{editingId ? 'Edit post' : 'New blog post'}</h2>
            <button onClick={closeForm} className="text-sm text-slate-400 hover:text-slate-700">✕ Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Title <span className="text-red-500">*</span></span>
              <input value={form.title} required
                onChange={(e) => { f('title', e.target.value); f('slug', slugify(e.target.value)); }}
                placeholder="My Awesome Blog Post"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
            </label>

            {/* Slug + author */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Slug <span className="text-red-500">*</span></span>
                <input value={form.slug} required onChange={(e) => f('slug', slugify(e.target.value))}
                  placeholder="my-awesome-blog-post"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-mono outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Author</span>
                <input value={form.author} onChange={(e) => f('author', e.target.value)}
                  placeholder="ARTecX Team"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
              </label>
            </div>

            {/* Excerpt */}
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Excerpt (shown in list view)</span>
              <textarea value={form.excerpt} onChange={(e) => f('excerpt', e.target.value)} rows={2}
                placeholder="A short description shown on the blog listing page…"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
            </label>

            {/* Content */}
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Content <span className="text-red-500">*</span></span>
              <textarea value={form.content} required onChange={(e) => f('content', e.target.value)} rows={12}
                placeholder="Write your blog post here… (Markdown supported)"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-mono outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 min-h-48" />
            </label>

            {/* Cover image */}
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Cover image</span>
              <p className="mb-2 text-xs text-slate-400">JPG, PNG, WEBP — max 10 MB</p>
              <div className="flex items-center gap-4">
                {form.coverUrl ? (
                  <img src={form.coverUrl} alt="Cover" className="h-20 w-36 rounded-xl object-cover border border-slate-200" />
                ) : (
                  <div className="h-20 w-36 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">No cover</div>
                )}
                <div>
                  <input id="blog-cover-input" type="file" accept="image/*" className="hidden" disabled={uploading}
                    onChange={(e) => { const f2 = e.target.files?.[0]; if (f2) handleCoverUpload(f2); e.target.value = ''; }} />
                  <button type="button" disabled={uploading}
                    onClick={() => document.getElementById('blog-cover-input')?.click()}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-50 transition">
                    {uploading ? 'Uploading…' : form.coverUrl ? 'Change cover' : 'Upload cover'}
                  </button>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Tags</span>
              <div className="flex gap-2">
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); }}}
                  placeholder="Type a tag and press Enter"
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-900" />
                <button type="button" onClick={() => addTag(tagInput)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">Add</button>
              </div>
              {form.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                      {tag}
                      <button type="button" onClick={() => f('tags', form.tags.filter((_, j) => j !== i))} className="opacity-60 hover:opacity-100">✕</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Published toggle */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" checked={form.published} onChange={(e) => f('published', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-slate-900" />
              <span className="text-sm font-medium text-slate-700">Publish (visible to public)</span>
            </label>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50 transition">
                {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create post'}
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
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-400">
          No blog posts yet — write your first one above.
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b._id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              {b.coverUrl ? (
                <img src={b.coverUrl} alt={b.title} className="h-14 w-24 shrink-0 rounded-xl object-cover border border-slate-100" />
              ) : (
                <div className="h-14 w-24 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs">No cover</div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900 truncate">{b.title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {b.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400 font-mono">/blog/{b.slug}</p>
                {b.tags.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {b.tags.map((t) => <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{t}</span>)}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 gap-2 items-center">
                <button onClick={() => openEdit(b)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-900 hover:bg-slate-50 transition">
                  Edit
                </button>
                {confirmDeleteId === b._id ? (
                  <div className="flex gap-1">
                    <button onClick={() => handleDelete(b._id)}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">Confirm</button>
                    <button onClick={() => setConfirmDeleteId(null)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">Keep</button>
                  </div>
                ) : (
                  <button onClick={() => handleDelete(b._id)}
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
