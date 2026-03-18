import { useRef, useState } from 'react';

interface ImageUploaderProps {
  /** Current image URL (pre-filled when editing) */
  value: string;
  /** Called with the Cloudinary URL after a successful upload */
  onUploaded: (url: string) => void;
}

import API_BASE from '../../config/api';

export const ImageUploader = ({ value, onUploaded }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Use absolute URL so multipart bypasses Vite's proxy
      // credentials: 'include' sends the session cookie the admin is already using
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? 'Upload failed');
      }

      onUploaded(data.url as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden native file input */}
      <input
        ref={inputRef}
        id="image-upload-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />

      <div className="flex items-center gap-3">
        {/* Thumbnail or placeholder */}
        {value ? (
          <img
            src={value}
            alt="Project preview"
            className="h-16 w-24 shrink-0 rounded-lg object-cover border border-slate-200"
          />
        ) : (
          <div className="h-16 w-24 shrink-0 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : value ? 'Change image' : 'Upload image'}
          </button>
          <p className="text-xs text-slate-400">JPG, PNG, WEBP — max 10 MB</p>
          {value && (
            <p className="text-xs text-slate-400 truncate max-w-[200px]" title={value}>
              ✓ Image saved
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};
