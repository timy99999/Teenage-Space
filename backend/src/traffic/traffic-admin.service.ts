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

interface ActiveUsersRow {
  day: string;
  dau: number | null;
  wau: number | null;
  mau: number | null;
  stickiness: number | null;
}

interface SessionStatsRow {
  day: string;
  visits: number;
  users: number;
  ms_avg: number | null;
  ms_p50: number | null;
  ms_p90: number | null;
}

interface FeatureAdoptionRow {
  feature: string;
  feature_group: string;
  label: string;
  events: number;
  users: number;
  adoption_pct: number | null;
  prev_users: number;
}

interface RetentionRow {
  cohort_week: string;
  cohort_size: number;
  d1: number | null;
  d7: number | null;
  d30: number | null;
}

interface TopUserRow {
  user_id: string;
  username: string;
  name: string;
  active_ms: number;
  visits: number;
  days_active: number;
  features_used: number;
  last_seen: string;
}

interface SearchInsightRow {
  query: string;
  searches: number;
  zero_results: number;
}

interface TopPageRow {
  path: string;
  views: number;
  visitors: number;
}

interface SignupFunnelRow {
  feature: string;
  label: string;
  sessions: number;
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

  /** DAU/WAU/MAU plus the session-level visitor counts beside them, so the guest
   *  vs signed-in gap is readable on one chart. Nulls are passed through: they
   *  mark days before per-user tracking existed, and the chart draws a gap. */
  async getGrowth(days: number) {
    const [activeRes, trendRes, sessionsRes] = await Promise.all([
      this.supabase.client.rpc('get_traffic_active_users', { p_days: days }),
      this.supabase.client.rpc('get_traffic_daily_trend', { p_days: days }),
      this.supabase.client.rpc('get_traffic_session_stats', { p_days: days })
    ]);
    for (const r of [activeRes, trendRes, sessionsRes]) {
      if (r.error) throw r.error;
    }

    const visitorsByDay = new Map<string, number>();
    for (const row of trendRes.data as DailyTrendRow[]) {
      visitorsByDay.set(row.day, Number(row.unique_sessions));
    }
    const sessionsByDay = new Map<string, SessionStatsRow>();
    for (const row of sessionsRes.data as SessionStatsRow[]) {
      sessionsByDay.set(row.day, row);
    }

    const active = activeRes.data as ActiveUsersRow[];
    return active.map((r) => {
      const s = sessionsByDay.get(r.day);
      return {
        day: r.day,
        dau: r.dau,
        wau: r.wau,
        mau: r.mau,
        stickiness: r.stickiness === null ? null : Number(r.stickiness),
        visitors: visitorsByDay.get(r.day) ?? 0,
        visits: s ? Number(s.visits) : 0,
        msAvg: s?.ms_avg ?? null,
        msP50: s?.ms_p50 ?? null,
        msP90: s?.ms_p90 ?? null
      };
    });
  }

  async getFeatureAdoption(days: number) {
    const { data, error } = await this.supabase.client.rpc('get_traffic_feature_adoption', { p_days: days });
    if (error) throw error;
    return (data as FeatureAdoptionRow[]).map((r) => ({
      feature: r.feature,
      group: r.feature_group,
      label: r.label,
      events: Number(r.events),
      users: Number(r.users),
      adoptionPct: r.adoption_pct === null ? null : Number(r.adoption_pct),
      prevUsers: Number(r.prev_users)
    }));
  }

  async getRetention(weeks: number) {
    const { data, error } = await this.supabase.client.rpc('get_traffic_retention', { p_cohort_weeks: weeks });
    if (error) throw error;
    return (data as RetentionRow[]).map((r) => ({
      cohortWeek: r.cohort_week,
      cohortSize: Number(r.cohort_size),
      d1: r.d1,
      d7: r.d7,
      d30: r.d30
    }));
  }

  async getTopUsers(days: number, limit: number) {
    const { data, error } = await this.supabase.client.rpc('get_traffic_top_users', {
      p_days: days,
      p_limit: limit
    });
    if (error) throw error;
    return (data as TopUserRow[]).map((r) => ({
      userId: r.user_id,
      username: r.username,
      name: r.name,
      activeMs: Number(r.active_ms),
      visits: Number(r.visits),
      daysActive: Number(r.days_active),
      featuresUsed: Number(r.features_used),
      lastSeen: r.last_seen
    }));
  }

  async getSearchInsights(days: number) {
    const { data, error } = await this.supabase.client.rpc('get_traffic_search_insights', { p_days: days });
    if (error) throw error;
    return (data as SearchInsightRow[]).map((r) => ({
      query: r.query,
      searches: Number(r.searches),
      zeroResults: Number(r.zero_results)
    }));
  }

  async getTopPages(days: number) {
    const { data, error } = await this.supabase.client.rpc('get_traffic_top_pages', { p_days: days });
    if (error) throw error;
    return (data as TopPageRow[]).map((r) => ({
      path: r.path,
      views: Number(r.views),
      visitors: Number(r.visitors)
    }));
  }

  async getSignupFunnel(days: number) {
    const { data, error } = await this.supabase.client.rpc('get_traffic_signup_funnel', { p_days: days });
    if (error) throw error;
    return (data as SignupFunnelRow[]).map((r) => ({
      feature: r.feature,
      label: r.label,
      sessions: Number(r.sessions)
    }));
  }

  async getUserProfile(userId: string, days: number) {
    const { data, error } = await this.supabase.client.rpc('get_traffic_user_profile', {
      p_user_id: userId,
      p_days: days
    });
    if (error) throw error;
    return data;
  }

  /** Returned verbatim: it is already shaped for an LLM to read (see
   *  get_analytics_digest), and remapping keys here would only inflate it. */
  async getDigest(days: number) {
    const { data, error } = await this.supabase.client.rpc('get_analytics_digest', { p_days: days });
    if (error) throw error;
    return data;
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
