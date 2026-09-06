import { Inject, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Cron } from '@nestjs/schedule';
import { SupabaseService } from '../supabase/supabase.service';
import { EventRow, mapEvent } from '../common/mappers';
import { QueryEventsDto } from './query-events.dto';

// Kyrgyzstan doesn't observe DST, so a fixed UTC+6 offset is used instead of an IANA
// timezone name — avoids depending on the runtime having full ICU timezone data.
const BISHKEK_UTC_OFFSET_MS = 6 * 60 * 60 * 1000;

function todayInBishkek(): string {
  return new Date(Date.now() + BISHKEK_UTC_OFFSET_MS).toISOString().slice(0, 10);
}

/** Bishkek calendar date one month back — the cutoff for archiving date-less events. */
function oneMonthAgoInBishkek(): string {
  const d = new Date(Date.now() + BISHKEK_UTC_OFFSET_MS);
  d.setUTCMonth(d.getUTCMonth() - 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Builds a PostgREST `.or()` filter for a case-insensitive substring match over
 * title + description. Returns null for blank input.
 *
 *  - `\ % _` in the user's text are backslash-escaped so LIKE treats them literally
 *    (backslash is Postgres's default LIKE escape char, no explicit ESCAPE needed);
 *  - the pattern is wrapped in double quotes and `"` is escaped, so commas, parens
 *    and dots in the query can't break the or() filter grammar.
 */
function buildSearchOrFilter(raw: string): string | null {
  const term = raw.trim();
  if (!term) return null;
  const escaped = term.replace(/[\\%_]/g, (c) => `\\${c}`).replace(/"/g, '\\"');
  return `title.ilike."%${escaped}%",description.ilike."%${escaped}%"`;
}

/**
 * Re-orders events by soonest registration deadline. Events whose deadline has
 * passed, and events with no deadline at all, go to the end (spec §2). Ties keep
 * the incoming order — the DB query already sorts newest-first — because
 * Array.prototype.sort is stable.
 */
function sortByDeadline<T extends { deadline_date: string | null }>(rows: T[], today: string): T[] {
  const bucket = (r: T): number => {
    if (!r.deadline_date) return 1; // no date
    if (r.deadline_date < today) return 2; // registration closed
    return 0; // deadline today or later
  };
  return [...rows].sort((a, b) => {
    const ba = bucket(a);
    const bb = bucket(b);
    if (ba !== bb) return ba - bb;
    if (ba === 0) return a.deadline_date! < b.deadline_date! ? -1 : a.deadline_date! > b.deadline_date! ? 1 : 0;
    return 0;
  });
}

@Injectable()
export class EventsService implements OnModuleInit {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly supabase: SupabaseService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  onModuleInit() {
    // Sweeps on boot too, so a restart after downtime catches events missed by the nightly cron.
    this.archiveExpiredEvents().catch((err) => this.logger.error('Startup archive sweep failed', err));
  }

  async list(query: QueryEventsDto) {
    let q = this.supabase.client.from('events').select('*').eq('archived', false);

    if (query.scope === 'upcoming') q = q.eq('is_past', false);
    else if (query.scope === 'past') q = q.eq('is_past', true);

    if (query.category) q = q.contains('categories', [query.category]);
    if (query.price) q = q.eq('price', query.price);
    if (query.level) q = q.eq('level', query.level);

    const categories = query.categories?.split(',').filter(Boolean) ?? [];
    if (categories.length) q = q.overlaps('categories', categories);

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

    if (query.q) {
      const orFilter = buildSearchOrFilter(query.q);
      if (orFilter) q = q.or(orFilter);
    }

    // Always fetch newest-first — it's the default order and the stable tiebreaker
    // for the deadline sort applied below.
    q = q.order('created_at', { ascending: false });

    const { data, error } = await q;
    if (error) throw error;

    const rows = (data ?? []) as EventRow[];
    const ordered = query.sort === 'deadline' ? sortByDeadline(rows, todayInBishkek()) : rows;
    return ordered.map(mapEvent);
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('events').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) throw new NotFoundException('Event not found');
    return mapEvent(data as EventRow);
  }

  /**
   * Archives events the day after their registration deadline — or, if none is set,
   * the day after the event's (end) date. Events with no dates at all are archived
   * a month after they were published. Runs nightly plus once on boot to catch up
   * after any downtime.
   */
  @Cron('0 18 * * *') // 00:00 in Asia/Bishkek (UTC+6), expressed in UTC to sidestep IANA timezone lookups
  async archiveExpiredEvents() {
    const today = todayInBishkek();
    const monthAgo = oneMonthAgoInBishkek();
    const base = () => this.supabase.client.from('events').update({ archived: true }).eq('archived', false);

    const [byDeadline, byEventEnd, byEventDate, byNoDates] = await Promise.all([
      base().not('deadline_date', 'is', null).lt('deadline_date', today).select('id'),
      base().is('deadline_date', null).not('event_date_end', 'is', null).lt('event_date_end', today).select('id'),
      base()
        .is('deadline_date', null)
        .is('event_date_end', null)
        .not('event_date', 'is', null)
        .lt('event_date', today)
        .select('id'),
      base()
        .is('deadline_date', null)
        .is('event_date_end', null)
        .is('event_date', null)
        .lt('created_at', monthAgo)
        .select('id')
    ]);

    const results = [byDeadline, byEventEnd, byEventDate, byNoDates];
    for (const r of results) {
      if (r.error) throw r.error;
    }

    const archivedCount = results.reduce((sum, r) => sum + (r.data?.length ?? 0), 0);
    if (archivedCount > 0) {
      await this.cache.clear();
      this.logger.log(`Auto-archived ${archivedCount} event(s) past their registration/event date`);
    }
  }
}
