import { supabase } from './supabase';

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.85;
// Formats safe to decode/redraw on a canvas without losing something that matters:
// excludes GIF (would flatten any animation to a single frame) and SVG (vector — a
// canvas render would rasterise it at a fixed size instead of staying scalable).
const RESIZABLE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

/** Downscales large event-cover photos client-side so a phone-camera original
 *  (several MB, thousands of px) isn't shipped as-is to every visitor for a
 *  ~200px card thumbnail. Keeps the source mime type (preserves PNG transparency).
 *  Falls back to the original file on any decode/encode failure — resizing must
 *  never block a publish. */
async function shrinkIfNeeded(file: File): Promise<File | Blob> {
  if (!RESIZABLE_TYPES.has(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    if (scale >= 1) {
      bitmap.close();
      return file;
    }
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, file.type, file.type === 'image/jpeg' ? JPEG_QUALITY : undefined)
    );
    return blob && blob.size > 0 ? blob : file;
  } catch {
    return file;
  }
}

export async function uploadPostImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Выберите файл изображения');
  if (file.size > 5 * 1024 * 1024) throw new Error('Файл слишком большой (макс. 5 МБ)');

  const toUpload = await shrinkIfNeeded(file);
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('posts').upload(path, toUpload, { contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from('posts').getPublicUrl(path);
  return data.publicUrl;
}
