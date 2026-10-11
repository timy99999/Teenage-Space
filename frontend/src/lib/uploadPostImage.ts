import { supabase } from './supabase';
import { compressImage } from './compressImage';

// Cards/modals never render a post photo wider than ~430px, even at 2x DPR
// that's under 900px — 1200 leaves headroom for bigger slots (e.g. og:image).
const MAX_DIMENSION = 1200;
// Upload paths are random UUIDs, so the same URL never points at different
// bytes — safe to cache for a year instead of the Supabase default of 1h.
const CACHE_CONTROL = '31536000';

export async function uploadPostImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Выберите файл изображения');
  if (file.size > 5 * 1024 * 1024) throw new Error('Файл слишком большой (макс. 5 МБ)');

  const { blob, ext, contentType } = await compressImage(file, MAX_DIMENSION);
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from('posts')
    .upload(path, blob, { contentType, cacheControl: CACHE_CONTROL });
  if (error) throw error;
  const { data } = supabase.storage.from('posts').getPublicUrl(path);
  return data.publicUrl;
}
