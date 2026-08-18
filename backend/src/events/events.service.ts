import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { EventRow, mapEvent } from '../common/mappers';
import { QueryEventsDto } from './query-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(query: QueryEventsDto) {
    let q = this.supabase.client.from('events').select('*');

    if (query.scope === 'upcoming') q = q.eq('is_past', false);
    else if (query.scope === 'past') q = q.eq('is_past', true);

    if (query.category) q = q.eq('category', query.category);
    if (query.price) q = q.eq('price', query.price);
    if (query.level) q = q.eq('level', query.level);

    const categories = query.categories?.split(',').filter(Boolean) ?? [];
    if (categories.length) q = q.in('category', categories);

    const themes = query.themes?.split(',').filter(Boolean) ?? [];
    if (themes.length) q = q.overlaps('themes', themes);

    q = q.order('event_date', { ascending: query.scope !== 'past' });

    const { data, error } = await q;
    if (error) throw error;

    let rows = (data ?? []) as EventRow[];

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
        rows = rows.filter((r) => r.age_min <= (hi as number) && r.age_max >= (lo as number));
      }
    }

    return rows.map(mapEvent);
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('events').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) throw new NotFoundException('Event not found');
    return mapEvent(data as EventRow);
  }
}
