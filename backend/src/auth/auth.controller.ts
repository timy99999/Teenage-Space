import { BadRequestException, Controller, Get, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { SupabaseService } from '../supabase/supabase.service';
import { BanStatusGuard } from './ban-status.guard';
import { CurrentUser } from './supabase-user.decorator';
import type { User } from '@supabase/supabase-js';

@Controller('auth')
export class AuthController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get('lookup-email')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async lookupEmail(@Query('username') username?: string) {
    if (!username) throw new BadRequestException('username is required');
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('email')
      .eq('username', username)
      .maybeSingle();
    if (error || !data?.email) throw new NotFoundException('User not found');
    return { email: data.email as string };
  }

  @Get('ban-status')
  @UseGuards(BanStatusGuard)
  async banStatus(@CurrentUser() user: User) {
    const { data } = await this.supabase.client
      .from('profiles')
      .select('is_banned, ban_expires_at, ban_reason')
      .eq('id', user.id)
      .maybeSingle();
    return {
      isBanned: !!data?.is_banned,
      banExpiresAt: (data?.ban_expires_at as string | null) ?? null,
      banReason: (data?.ban_reason as string | null) ?? null
    };
  }
}
