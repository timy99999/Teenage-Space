import { ConflictException, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class RatingsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(userId: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase.client
      .from('ratings')
      .select('event_id, value')
      .eq('user_id', userId);
    if (error) throw error;
    const out: Record<string, number> = {};
    for (const row of data ?? []) out[row.event_id as string] = row.value as number;
    return out;
  }

  async rate(userId: string, eventId: string, value: number) {
    const { data: existing, error: findError } = await this.supabase.client
      .from('ratings')
      .select('event_id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .maybeSingle();
    if (findError) throw findError;
    if (existing) throw new ConflictException('Вы уже голосовали за это мероприятие');

    const { error } = await this.supabase.client.from('ratings').insert({ user_id: userId, event_id: eventId, value });
    if (error) throw error;
    return { value };
  }
}
