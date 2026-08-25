import { BadRequestException, Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { SupabaseService } from '../supabase/supabase.service';

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
}
