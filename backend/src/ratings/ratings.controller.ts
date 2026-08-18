import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/supabase-user.decorator';
import type { User } from '@supabase/supabase-js';
import { RatingsService } from './ratings.service';
import { RateEventDto } from './rate-event.dto';

@Controller('ratings')
@UseGuards(SupabaseAuthGuard)
export class RatingsController {
  constructor(private readonly ratings: RatingsService) {}

  @Get()
  list(@CurrentUser() user: User) {
    return this.ratings.list(user.id);
  }

  @Post(':eventId')
  rate(@CurrentUser() user: User, @Param('eventId') eventId: string, @Body() dto: RateEventDto) {
    return this.ratings.rate(user.id, eventId, dto.value);
  }
}
