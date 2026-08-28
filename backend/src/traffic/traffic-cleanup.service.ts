import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SupabaseService } from '../supabase/supabase.service';

// Kyrgyzstan doesn't observe DST, so a fixed UTC+6 offset is used instead of an IANA
// timezone name — avoids depending on the runtime having full ICU timezone data
// (same trick as events.service.ts's archive sweep).
const BISHKEK_UTC_OFFSET_MS = 6 * 60 * 60 * 1000;

const EVENTS_RETENTION_DAYS = 30;
const SESSIONS_RETENTION_DAYS = 1;

function yesterdayInBishkek(): string {
  const bishkekNow = new Date(Date.now() + BISHKEK_UTC_OFFSET_MS);
  bishkekNow.setUTCDate(bishkekNow.getUTCDate() - 1);
  return bishkekNow.toISOString().slice(0, 10);
}

/**
 * Keeps traffic_events/traffic_sessions bounded so raw visitor tracking never threatens
 * the DB size budget (see the capacity page this feature sits next to). Rolls yesterday's
 * raw events into traffic_daily_rollup (so long-term trend data survives), then prunes
 * old raw rows.
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
    const day = yesterdayInBishkek();
    const start = `${day}T00:00:00+06:00`;
    const end = `${day}T23:59:59.999+06:00`;

    const { data: rows, error: fetchError } = await this.supabase.client
      .from('traffic_events')
      .select('event_type, session_id, device_type, is_logged_in')
      .gte('created_at', start)
      .lte('created_at', end);
    if (fetchError) throw fetchError;

    if (rows && rows.length > 0) {
      const uniqueSessions = new Set<string>();
      const loggedInSessions = new Set<string>();
      const guestSessions = new Set<string>();
      let pageViews = 0;
      let cardViews = 0;
      let linkClicks = 0;
      let deviceMobile = 0;
      let deviceTablet = 0;
      let deviceDesktop = 0;

      for (const r of rows as { event_type: string; session_id: string; device_type: string; is_logged_in: boolean }[]) {
        uniqueSessions.add(r.session_id);
        if (r.is_logged_in) loggedInSessions.add(r.session_id);
        else guestSessions.add(r.session_id);
        if (r.event_type === 'page_view') pageViews += 1;
        else if (r.event_type === 'card_view') cardViews += 1;
        else if (r.event_type === 'link_click') linkClicks += 1;
        if (r.device_type === 'mobile') deviceMobile += 1;
        else if (r.device_type === 'tablet') deviceTablet += 1;
        else if (r.device_type === 'desktop') deviceDesktop += 1;
      }

      const { error: upsertError } = await this.supabase.client.from('traffic_daily_rollup').upsert({
        day,
        page_views: pageViews,
        card_views: cardViews,
        link_clicks: linkClicks,
        unique_sessions: uniqueSessions.size,
        logged_in_sessions: loggedInSessions.size,
        guest_sessions: guestSessions.size,
        device_mobile: deviceMobile,
        device_tablet: deviceTablet,
        device_desktop: deviceDesktop
      });
      if (upsertError) throw upsertError;
    }

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
  }
}
