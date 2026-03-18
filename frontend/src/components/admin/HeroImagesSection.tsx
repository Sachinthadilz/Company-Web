import { useState, useEffect, useCallback } from 'react';

interface HeroImage {
  _id: string;
  url: string;
  publicId: string;
  order: number;
}

import API_BASE from '../../config/api';

const API = API_BASE;

export const HeroImagesSection = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch(`${API}/hero-images`);
      const data = await res.json();
      if (data.success) setImages(data.data);
    } catch {
      setError('Failed to load hero images');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Called when ImageUploader finishes uploading — we get url + publicId from the response
  // But ImageUploader only calls onUploaded(url). We need publicId too.
  // So we use a thin wrapper that hits upload then immediately saves to DB.
  const handleUpload = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const uploadRes = await fetch(`${API}/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.success) throw new Error(uploadData.message ?? 'Upload failed');

      // Immediately persist to hero images
      const saveRes = await fetch(`${API}/admin/hero-images`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: uploadData.url, publicId: uploadData.publicId }),
      });
      const saveData = await saveRes.json();
      if (!saveRes.ok || !saveData.success) throw new Error(saveData.message ?? 'Save failed');

      setImages((prev) => [...prev, saveData.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/admin/hero-images/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? 'Delete failed');
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setSaving(false);
    }
  };

  const move = async (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const swapIdx = direction === 'up' ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= newImages.length) return;
    [newImages[index], newImages[swapIdx]] = [newImages[swapIdx], newImages[index]];
    setImages(newImages);

    // Persist order
    await fetch(`${API}/admin/hero-images/reorder`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: newImages.map((img) => img._id) }),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Hero Images</h1>
        <p className="mt-1 text-sm text-slate-500">
          Images shown in the homepage slider.{' '}
          {images.length}/4 uploaded
          {images.length < 2 && ' — add at least 2 for the slider to work well'}.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Upload new image */}
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6">
        <p className="mb-1 text-sm font-medium text-slate-700">Upload a new hero image</p>
        <p className="mb-3 text-xs text-slate-400">JPG, PNG, WEBP — max 10 MB</p>
        <input
          id="hero-file-input"
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => document.getElementById('hero-file-input')?.click()}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Uploading…
            </span>
          ) : (
            '+ Upload image'
          )}
        </button>
      </div>

      {/* Image grid */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-400">Loading…</div>
      ) : images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-400">
          No hero images yet — upload your first one above.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, idx) => (
            <div
              key={img._id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={img.url}
                alt={`Hero ${idx + 1}`}
                className="h-44 w-full object-cover"
              />

              {/* Slide order badge */}
              <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold text-white">
                Slide {idx + 1}
              </span>

              {/* Controls */}
              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <div className="flex gap-1">
                  <button
                    type="button"
                    disabled={idx === 0 || saving}
                    onClick={() => move(idx, 'up')}
                    className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-30"
                    title="Move left"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    disabled={idx === images.length - 1 || saving}
                    onClick={() => move(idx, 'down')}
                    className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-30"
                    title="Move right"
                  >
                    →
                  </button>
                </div>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleDelete(img._id)}
                  className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 hover:border-red-300 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
