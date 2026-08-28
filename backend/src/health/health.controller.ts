import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { SupabaseService } from '../supabase/supabase.service';

const DB_PING_TIMEOUT_MS = 2500;

/**
 * Liveness probe for Railway's healthcheck. Always answers 200 while the process can
 * still serve — a hung or dead process simply won't respond, and Railway restarts it.
 * We deliberately do NOT 503 on a database outage: restarting the container wouldn't
 * bring Supabase back, and a restart loop would only make things worse. The db field
 * is there for humans / monitoring.
 */
@Controller('health')
@SkipThrottle()
export class HealthController {
  private readonly startedAt = Date.now();

  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async check() {
    const startedPing = Date.now();
    let db: 'ok' | 'slow' | 'down' = 'down';
    try {
      const query = this.supabase.client.from('events').select('id', { head: true, count: 'exact' }).limit(1);
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('db ping timeout')), DB_PING_TIMEOUT_MS)
      );
      const { error } = (await Promise.race([query, timeout])) as { error: unknown };
      if (!error) db = Date.now() - startedPing > 1000 ? 'slow' : 'ok';
    } catch {
      db = 'down';
    }

    return {
      status: 'ok',
      db,
      dbLatencyMs: Date.now() - startedPing,
      uptimeSec: Math.floor((Date.now() - this.startedAt) / 1000)
    };
  }
}
