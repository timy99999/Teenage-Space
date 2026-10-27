import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { TrackViewDto } from './dto/track-view.dto';
import { TrackCardViewDto } from './dto/track-card-view.dto';
import { TrackLinkClickDto } from './dto/track-link-click.dto';
import { TrackFeatureDto } from './dto/track-feature.dto';
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

  async recordPageView(dto: TrackViewDto, userId: string | null) {
    await this.insertEvent({
      session_id: dto.sessionId,
      user_id: userId,
      event_type: 'page_view',
      path: dto.path,
      device_type: dto.deviceType,
      is_logged_in: userId !== null
    });
  }

  async recordCardView(dto: TrackCardViewDto, userId: string | null) {
    await this.insertEvent({
      session_id: dto.sessionId,
      user_id: userId,
      event_type: 'card_view',
      target_type: dto.targetType,
      target_id: dto.targetId,
      device_type: dto.deviceType,
      is_logged_in: userId !== null
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

  async recordLinkClick(dto: TrackLinkClickDto, userId: string | null) {
    await this.insertEvent({
      session_id: dto.sessionId,
      user_id: userId,
      event_type: 'link_click',
      link_kind: dto.linkKind,
      target_type: dto.targetType,
      target_id: dto.targetId,
      device_type: dto.deviceType,
      is_logged_in: userId !== null
    });
  }

  async recordFeature(dto: TrackFeatureDto, userId: string | null) {
    await this.insertEvent({
      session_id: dto.sessionId,
      user_id: userId,
      event_type: 'feature',
      feature: dto.feature,
      detail: dto.detail ?? null,
      device_type: dto.deviceType,
      is_logged_in: userId !== null
    });
  }

  // Goes through an RPC rather than an upsert: the row carries running counters
  // for the current visit (visit_active_ms, visit_heartbeats, visit_started_at),
  // and a plain upsert would reset them to their defaults on every beat — engaged
  // time would silently stay zero. The RPC also credits the elapsed interval to
  // the right Bishkek day, so a visit spanning midnight splits correctly.
  async recordHeartbeat(dto: HeartbeatDto, userId: string | null) {
    try {
      const { error } = await this.supabase.client.rpc('record_heartbeat', {
        p_session_id: dto.sessionId,
        p_device_type: dto.deviceType,
        p_user_id: userId
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
