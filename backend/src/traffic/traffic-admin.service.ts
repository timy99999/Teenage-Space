import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

const ONLINE_WINDOW_MS = 90 * 1000;
const TOP_CARDS_LIMIT = 10;

interface HourlyRow {
  hour: number;
  views: number;
}

interface DailyTrendRow {
  day: string;
  page_views: number;
  card_views: number;
  link_clicks: number;
  unique_sessions: number;
}

interface TopCardRow {
  target_type: string;
  target_id: string;
  title: string;
  views: number;
}

interface DeviceRow {
  device_type: string;
  sessions: number;
}

interface LoginSplitRow {
  is_logged_in: boolean;
  sessions: number;
}

interface TopLinkRow {
  link_kind: string;
  clicks: number;
}

interface CardUniqueViewsRow {
  target_type: string;
  target_id: string;
  unique_views: number;
}

@Injectable()
export class TrafficAdminService {
  constructor(private readonly supabase: SupabaseService) {}

  async getCardViews() {
    const { data, error } = await this.supabase.client.rpc('get_card_unique_views');
    if (error) throw error;
    return (data as CardUniqueViewsRow[]).map((r) => ({
      targetType: r.target_type,
      targetId: r.target_id,
      uniqueViews: Number(r.unique_views)
    }));
  }

  async getOnlineNow() {
    const cutoff = new Date(Date.now() - ONLINE_WINDOW_MS).toISOString();
    const { count, error } = await this.supabase.client
      .from('traffic_sessions')
      .select('*', { count: 'exact', head: true })
      .gte('last_seen_at', cutoff);
    if (error) throw error;
    return { onlineNow: count ?? 0 };
  }

  async getSummary(days: number) {
    const [hourlyRes, trendRes, topCardsRes, deviceRes, loginSplitRes, topLinksRes] = await Promise.all([
      this.supabase.client.rpc('get_traffic_hourly_today'),
      this.supabase.client.rpc('get_traffic_daily_trend', { p_days: days }),
      this.supabase.client.rpc('get_traffic_top_cards', { p_days: days, p_limit: TOP_CARDS_LIMIT }),
      this.supabase.client.rpc('get_traffic_device_breakdown', { p_days: days }),
      this.supabase.client.rpc('get_traffic_login_split', { p_days: days }),
      this.supabase.client.rpc('get_traffic_top_links', { p_days: days })
    ]);

    for (const r of [hourlyRes, trendRes, topCardsRes, deviceRes, loginSplitRes, topLinksRes]) {
      if (r.error) throw r.error;
    }

    const hourlyToday = (hourlyRes.data as HourlyRow[]).map((r) => ({ hour: r.hour, views: Number(r.views) }));
    const peak = hourlyToday.reduce<{ hour: number; views: number } | null>(
      (best, cur) => (cur.views > 0 && (!best || cur.views > best.views) ? cur : best),
      null
    );

    const dailyTrend = (trendRes.data as DailyTrendRow[]).map((r) => ({
      day: r.day,
      pageViews: Number(r.page_views),
      cardViews: Number(r.card_views),
      linkClicks: Number(r.link_clicks),
      uniqueSessions: Number(r.unique_sessions)
    }));
    const todayRow = dailyTrend[dailyTrend.length - 1] ?? {
      pageViews: 0,
      cardViews: 0,
      linkClicks: 0,
      uniqueSessions: 0
    };

    const loginSplit = { loggedIn: 0, guest: 0 };
    for (const row of loginSplitRes.data as LoginSplitRow[]) {
      if (row.is_logged_in) loginSplit.loggedIn = Number(row.sessions);
      else loginSplit.guest = Number(row.sessions);
    }

    return {
      today: {
        pageViews: todayRow.pageViews,
        cardViews: todayRow.cardViews,
        linkClicks: todayRow.linkClicks,
        uniqueSessions: todayRow.uniqueSessions,
        loggedInSessions: loginSplit.loggedIn,
        guestSessions: loginSplit.guest
      },
      hourlyToday,
      peakHour: peak?.hour ?? null,
      dailyTrend,
      topCards: (topCardsRes.data as TopCardRow[]).map((r) => ({
        targetType: r.target_type,
        targetId: r.target_id,
        title: r.title,
        views: Number(r.views)
      })),
      deviceBreakdown: (deviceRes.data as DeviceRow[]).map((r) => ({
        deviceType: r.device_type,
        sessions: Number(r.sessions)
      })),
      topLinks: (topLinksRes.data as TopLinkRow[]).map((r) => ({
        linkKind: r.link_kind,
        clicks: Number(r.clicks)
      }))
    };
  }
}
