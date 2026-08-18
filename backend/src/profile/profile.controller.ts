import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/supabase-user.decorator';
import type { User } from '@supabase/supabase-js';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './update-profile.dto';

@Controller('profile')
@UseGuards(SupabaseAuthGuard)
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}

  @Get()
  get(@CurrentUser() user: User) {
    return this.profile.getOrCreate(user);
  }

  @Patch()
  update(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profile.update(user, dto);
  }
}
