import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { TrackViewDto } from './dto/track-view.dto';
import { TrackCardViewDto } from './dto/track-card-view.dto';
import { TrackLinkClickDto } from './dto/track-link-click.dto';
import { HeartbeatDto } from './dto/heartbeat.dto';

function describeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (err && typeof err === 'object') return JSON.stringify(err);
  return String(err);
}

/**
 * Public, anonymous ingestion of visitor traffic. Every write here is best-effort: a
 * DB hiccup must never surface as an error to a site visitor, so failures are logged
 * and swallowed rather than thrown.
 */
@Injectable()
export class TrafficService {
  private readonly logger = new Logger(TrafficService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async recordPageView(dto: TrackViewDto) {
    await this.insertEvent({
      session_id: dto.sessionId,
      event_type: 'page_view',
      path: dto.path,
      device_type: dto.deviceType,
      is_logged_in: dto.isLoggedIn
    });
  }

  async recordCardView(dto: TrackCardViewDto) {
    await this.insertEvent({
      session_id: dto.sessionId,
      event_type: 'card_view',
      target_type: dto.targetType,
      target_id: dto.targetId,
      device_type: dto.deviceType,
      is_logged_in: dto.isLoggedIn
    });
    await this.recordUniqueCardView(dto);
  }

  // Deduped by (target_type, target_id, session_id), so a plain row count of this table
  // is already an exact unique-visitor count per card — and unlike traffic_events, it's
  // never pruned by the retention cron, so the count never decays over time.
  private async recordUniqueCardView(dto: TrackCardViewDto) {
    try {
      const { error } = await this.supabase.client.from('traffic_card_views').upsert(
        {
          target_type: dto.targetType,
          target_id: dto.targetId,
          session_id: dto.sessionId
        },
        { onConflict: 'target_type,target_id,session_id', ignoreDuplicates: true }
      );
      if (error) throw error;
    } catch (err) {
      this.logger.warn(`Failed to record unique card view: ${describeError(err)}`);
    }
  }

  async recordLinkClick(dto: TrackLinkClickDto) {
    await this.insertEvent({
      session_id: dto.sessionId,
      event_type: 'link_click',
      link_kind: dto.linkKind,
      target_type: dto.targetType,
      target_id: dto.targetId,
      device_type: dto.deviceType,
      is_logged_in: dto.isLoggedIn
    });
  }

  async recordHeartbeat(dto: HeartbeatDto) {
    try {
      const { error } = await this.supabase.client.from('traffic_sessions').upsert({
        session_id: dto.sessionId,
        device_type: dto.deviceType,
        is_logged_in: dto.isLoggedIn,
        last_seen_at: new Date().toISOString()
      });
      if (error) throw error;
    } catch (err) {
      this.logger.warn(`Failed to record heartbeat: ${describeError(err)}`);
    }
  }

  private async insertEvent(row: Record<string, unknown>) {
    try {
      const { error } = await this.supabase.client.from('traffic_events').insert(row);
      if (error) throw error;
    } catch (err) {
      this.logger.warn(`Failed to record traffic event: ${describeError(err)}`);
    }
  }
}
