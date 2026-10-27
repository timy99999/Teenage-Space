import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SupabaseService } from '../supabase/supabase.service';

// Kyrgyzstan doesn't observe DST, so a fixed UTC+6 offset is used instead of an IANA
// timezone name — avoids depending on the runtime having full ICU timezone data
// (same trick as events.service.ts's archive sweep).
const BISHKEK_UTC_OFFSET_MS = 6 * 60 * 60 * 1000;

const EVENTS_RETENTION_DAYS = 90;
// Visitor rows are no longer disposable: they carry first_seen_at (new vs
// returning) and the running counters for the visit in progress, so pruning them
// daily would reset a returning visitor's history and lose their open visit.
const SESSIONS_RETENTION_DAYS = 90;
const VISITS_RETENTION_DAYS = 90;

function bishkekDayOffsetFromToday(daysAgo: number): string {
  const bishkekNow = new Date(Date.now() + BISHKEK_UTC_OFFSET_MS);
  bishkekNow.setUTCDate(bishkekNow.getUTCDate() - daysAgo);
  return bishkekNow.toISOString().slice(0, 10);
}

/**
 * Keeps traffic_events/traffic_sessions bounded so raw visitor tracking never threatens
 * the DB size budget (see the capacity page this feature sits next to), and rolls each
 * finished day into the aggregate tables that outlive the raw rows.
 *
 * The aggregation itself lives in rollup_traffic_day() rather than here. It used to be a
 * JS loop over rows fetched through PostgREST, which caps responses at 1000 rows by
 * default — so any day busier than that was silently under-counted.
 */
@Injectable()
export class TrafficCleanupService implements OnModuleInit {
  private readonly logger = new Logger(TrafficCleanupService.name);

  constructor(private readonly supabase: SupabaseService) {}

  onModuleInit() {
    // Also runs on boot, so a restart after downtime doesn't skip a day's rollup.
    this.rollupAndPruneTraffic().catch((err) => this.logger.error('Startup traffic rollup failed', err));
  }

  @Cron('0 18 * * *') // 00:00 in Asia/Bishkek (UTC+6), expressed in UTC to sidestep IANA timezone lookups
  async rollupAndPruneTraffic() {
    // A visit is normally closed by the next heartbeat arriving late; someone who
    // closes the tab for good never sends one, so their last visit would sit open
    // and stay out of the duration stats. Close those first, then aggregate.
    const { error: flushError } = await this.supabase.client.rpc('flush_stale_visits');
    if (flushError) throw flushError;

    // Yesterday is the day that just finished. Today is still being written to and
    // is computed live on read (see get_traffic_daily_trend).
    const { error: rollupError } = await this.supabase.client.rpc('rollup_traffic_day', {
      p_day: bishkekDayOffsetFromToday(1)
    });
    if (rollupError) throw rollupError;

    const eventsCutoff = new Date(Date.now() - EVENTS_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const { error: pruneEventsError } = await this.supabase.client
      .from('traffic_events')
      .delete()
      .lt('created_at', eventsCutoff);
    if (pruneEventsError) throw pruneEventsError;

    const sessionsCutoff = new Date(Date.now() - SESSIONS_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const { error: pruneSessionsError } = await this.supabase.client
      .from('traffic_sessions')
      .delete()
      .lt('last_seen_at', sessionsCutoff);
    if (pruneSessionsError) throw pruneSessionsError;

    const visitsCutoff = new Date(Date.now() - VISITS_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const { error: pruneVisitsError } = await this.supabase.client
      .from('traffic_visits')
      .delete()
      .lt('started_at', visitsCutoff);
    if (pruneVisitsError) throw pruneVisitsError;
  }
}
