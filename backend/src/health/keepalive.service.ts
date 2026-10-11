import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { SupabaseService } from '../supabase/supabase.service';

const PING_INTERVAL_MS = 4 * 60 * 1000;

/**
 * A request hitting a cold Supabase connection was taking ~2.2s vs ~0.5s warm
 * (measured directly: first curl to /api/events after a few idle minutes vs.
 * immediate follow-ups) — enough to be the single biggest contributor to LCP
 * for a real visitor landing on a quiet site, well past anything the frontend
 * controls. Pinging on an interval well under any idle-connection timeout keeps
 * the pool from ever going cold between real requests. Same query shape as
 * HealthController's own DB ping, just on a timer instead of per-request.
 */
@Injectable()
export class KeepaliveService {
  private readonly logger = new Logger(KeepaliveService.name);

  constructor(private readonly supabase: SupabaseService) {}

  @Interval(PING_INTERVAL_MS)
  async ping() {
    try {
      await this.supabase.client.from('events').select('id', { head: true, count: 'exact' }).limit(1);
    } catch (err) {
      this.logger.warn(`Keepalive ping failed: ${err instanceof Error ? err.message : err}`);
    }
  }
}
