import { useRef, useState } from 'react';
import { useUI } from '../contexts/UIContext';
import { uploadPostImage } from '../lib/uploadPostImage';

interface ImageUploadFieldProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const { flash } = useUI();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadPostImage(file);
      onChange(url);
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Не удалось загрузить фото');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="ts-publish-photo" style={{ position: 'relative' }}>
      {value ? (
        <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 12,
            color: 'var(--ts-fg)',
            opacity: 0.45
          }}
        >
          Фото 3:4
        </div>
      )}
      <input ref={fileInput} type="file" accept="image/*" hidden onChange={onPick} />
      <button
        type="button"
        className="ts-btn-outline small"
        style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}
        onClick={() => fileInput.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Загрузка...' : value ? 'Заменить фото' : 'Загрузить фото'}
      </button>
    </div>
  );
}
