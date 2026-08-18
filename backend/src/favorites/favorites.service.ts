import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(userId: string): Promise<string[]> {
    const { data, error } = await this.supabase.client.from('favorites').select('event_id').eq('user_id', userId);
    if (error) throw error;
    return (data ?? []).map((r) => r.event_id as string);
  }

  async toggle(userId: string, eventId: string): Promise<{ favorited: boolean }> {
    const { data: existing, error: findError } = await this.supabase.client
      .from('favorites')
      .select('event_id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .maybeSingle();
    if (findError) throw findError;

    if (existing) {
      const { error } = await this.supabase.client
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('event_id', eventId);
      if (error) throw error;
      return { favorited: false };
    }

    const { error } = await this.supabase.client.from('favorites').insert({ user_id: userId, event_id: eventId });
    if (error) throw error;
    return { favorited: true };
  }
}
