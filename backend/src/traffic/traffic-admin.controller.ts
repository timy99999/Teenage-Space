import { Controller, Get, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { SuperAdminGuard } from '../auth/super-admin.guard';
import { TrafficAdminService } from './traffic-admin.service';
import { TrafficQueryDto } from './dto/traffic-query.dto';

const DEFAULT_DAYS = 14;
const DEFAULT_GROWTH_DAYS = 30;
const DEFAULT_COHORT_WEEKS = 12;
const TOP_USERS_LIMIT = 20;
const USER_PROFILE_DAYS = 30;

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

  @Get('growth')
  getGrowth(@Query() query: TrafficQueryDto) {
    return this.trafficAdmin.getGrowth(query.days ?? DEFAULT_GROWTH_DAYS);
  }

  @Get('features')
  getFeatures(@Query() query: TrafficQueryDto) {
    return this.trafficAdmin.getFeatureAdoption(query.days ?? DEFAULT_GROWTH_DAYS);
  }

  @Get('retention')
  getRetention() {
    return this.trafficAdmin.getRetention(DEFAULT_COHORT_WEEKS);
  }

  @Get('top-users')
  getTopUsers(@Query() query: TrafficQueryDto) {
    return this.trafficAdmin.getTopUsers(query.days ?? DEFAULT_GROWTH_DAYS, TOP_USERS_LIMIT);
  }

  @Get('funnel')
  getFunnel(@Query() query: TrafficQueryDto) {
    return this.trafficAdmin.getSignupFunnel(query.days ?? DEFAULT_GROWTH_DAYS);
  }

  @Get('search')
  getSearch(@Query() query: TrafficQueryDto) {
    return this.trafficAdmin.getSearchInsights(query.days ?? DEFAULT_DAYS);
  }

  @Get('pages')
  getPages(@Query() query: TrafficQueryDto) {
    return this.trafficAdmin.getTopPages(query.days ?? DEFAULT_DAYS);
  }

  @Get('digest')
  getDigest(@Query() query: TrafficQueryDto) {
    return this.trafficAdmin.getDigest(query.days ?? 90);
  }

  // Last, so it can't shadow the fixed segments above.
  @Get('user/:id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.trafficAdmin.getUserProfile(id, USER_PROFILE_DAYS);
  }
}
