import { supabase } from './supabase';

export async function uploadPostImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Выберите файл изображения');
  if (file.size > 5 * 1024 * 1024) throw new Error('Файл слишком большой (макс. 5 МБ)');

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('posts').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('posts').getPublicUrl(path);
  return data.publicUrl;
}
