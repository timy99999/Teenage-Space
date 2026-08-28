import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { TrafficService } from './traffic.service';
import { TrackViewDto } from './dto/track-view.dto';
import { TrackCardViewDto } from './dto/track-card-view.dto';
import { TrackLinkClickDto } from './dto/track-link-click.dto';
import { HeartbeatDto } from './dto/heartbeat.dto';

const TRACK_THROTTLE = { default: { limit: 30, ttl: 60000 } };

@Controller('traffic')
export class TrafficController {
  constructor(private readonly traffic: TrafficService) {}

  @Post('view')
  @HttpCode(204)
  @Throttle(TRACK_THROTTLE)
  async view(@Body() dto: TrackViewDto) {
    await this.traffic.recordPageView(dto);
  }

  @Post('card-view')
  @HttpCode(204)
  @Throttle(TRACK_THROTTLE)
  async cardView(@Body() dto: TrackCardViewDto) {
    await this.traffic.recordCardView(dto);
  }

  @Post('link-click')
  @HttpCode(204)
  @Throttle(TRACK_THROTTLE)
  async linkClick(@Body() dto: TrackLinkClickDto) {
    await this.traffic.recordLinkClick(dto);
  }

  @Post('heartbeat')
  @HttpCode(204)
  @Throttle({ default: { limit: 6, ttl: 60000 } })
  async heartbeat(@Body() dto: HeartbeatDto) {
    await this.traffic.recordHeartbeat(dto);
  }
}
