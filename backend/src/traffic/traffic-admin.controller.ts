import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { SuperAdminGuard } from '../auth/super-admin.guard';
import { TrafficAdminService } from './traffic-admin.service';
import { TrafficQueryDto } from './dto/traffic-query.dto';

const DEFAULT_DAYS = 14;

@Controller('admin/traffic')
@UseGuards(SupabaseAuthGuard, SuperAdminGuard)
export class TrafficAdminController {
  constructor(private readonly trafficAdmin: TrafficAdminService) {}

  @Get('online')
  getOnline() {
    return this.trafficAdmin.getOnlineNow();
  }

  @Get('card-views')
  getCardViews() {
    return this.trafficAdmin.getCardViews();
  }

  @Get('summary')
  getSummary(@Query() query: TrafficQueryDto) {
    return this.trafficAdmin.getSummary(query.days ?? DEFAULT_DAYS);
  }
}
