import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { EventRow, mapEvent } from '../common/mappers';
import { QueryEventsDto } from './query-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(query: QueryEventsDto) {
    let q = this.supabase.client.from('events').select('*').eq('archived', false);

    if (query.scope === 'upcoming') q = q.eq('is_past', false);
    else if (query.scope === 'past') q = q.eq('is_past', true);

    if (query.category) q = q.eq('category', query.category);
    if (query.price) q = q.eq('price', query.price);
    if (query.level) q = q.eq('level', query.level);

    const categories = query.categories?.split(',').filter(Boolean) ?? [];
    if (categories.length) q = q.in('category', categories);

    const themes = query.themes?.split(',').filter(Boolean) ?? [];
    if (themes.length) q = q.overlaps('themes', themes);

    if (query.age) {
      const m = query.age.match(/^(\d+)\s*-\s*(\d+)$/);
      let lo: number | null = null;
      let hi: number | null = null;
      if (m) {
        lo = Number(m[1]);
        hi = Number(m[2]);
      } else if (/^\d+$/.test(query.age)) {
        lo = hi = Number(query.age);
      }
      if (lo !== null && hi !== null) {
        q = q.lte('age_min', hi).gte('age_max', lo);
      }
    }

    q = q.order('created_at', { ascending: false });

    const { data, error } = await q;
    if (error) throw error;

    return ((data ?? []) as EventRow[]).map(mapEvent);
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('events').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) throw new NotFoundException('Event not found');
    return mapEvent(data as EventRow);
  }
}
