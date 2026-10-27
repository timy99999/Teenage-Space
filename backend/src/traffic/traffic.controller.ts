import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { AuthTokenService } from '../auth/auth-token.service';
import { TrafficService } from './traffic.service';
import { TrackViewDto } from './dto/track-view.dto';
import { TrackCardViewDto } from './dto/track-card-view.dto';
import { TrackLinkClickDto } from './dto/track-link-click.dto';
import { HeartbeatDto } from './dto/heartbeat.dto';

const TRACK_THROTTLE = { default: { limit: 30, ttl: 60000 } };

/** Public, unauthenticated tracking ingestion. The frontend's api client attaches
 *  the Supabase bearer token to every call it makes (see frontend/src/lib/api.ts),
 *  so a signed-in visitor's events arrive with a token we can trust — the id is
 *  always derived from it here, never read from the request body, because anyone
 *  could POST a body claiming to be someone else. */
@Controller('traffic')
export class TrafficController {
  constructor(
    private readonly traffic: TrafficService,
    private readonly authToken: AuthTokenService
  ) {}

  @Post('view')
  @HttpCode(204)
  @Throttle(TRACK_THROTTLE)
  async view(@Body() dto: TrackViewDto, @Req() req: Request) {
    await this.traffic.recordPageView(dto, await this.authToken.resolveOptionalUserId(req));
  }

  @Post('card-view')
  @HttpCode(204)
  @Throttle(TRACK_THROTTLE)
  async cardView(@Body() dto: TrackCardViewDto, @Req() req: Request) {
    await this.traffic.recordCardView(dto, await this.authToken.resolveOptionalUserId(req));
  }

  @Post('link-click')
  @HttpCode(204)
  @Throttle(TRACK_THROTTLE)
  async linkClick(@Body() dto: TrackLinkClickDto, @Req() req: Request) {
    await this.traffic.recordLinkClick(dto, await this.authToken.resolveOptionalUserId(req));
  }

  @Post('heartbeat')
  @HttpCode(204)
  @Throttle({ default: { limit: 6, ttl: 60000 } })
  async heartbeat(@Body() dto: HeartbeatDto, @Req() req: Request) {
    await this.traffic.recordHeartbeat(dto, await this.authToken.resolveOptionalUserId(req));
  }
}
