import { Body, Controller, Delete, Get, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/supabase-user.decorator';
import type { User } from '@supabase/supabase-js';
import { ProfileService } from './profile.service';
import { TelegramLinkService } from '../bot/telegram-link.service';
import { UpdateProfileDto } from './update-profile.dto';

@Controller('profile')
@UseGuards(SupabaseAuthGuard)
export class ProfileController {
  constructor(
    private readonly profile: ProfileService,
    private readonly telegramLink: TelegramLinkService
  ) {}

  @Get()
  get(@CurrentUser() user: User) {
    return this.profile.getOrCreate(user);
  }

  @Patch()
  update(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profile.update(user, dto);
  }

  @Delete()
  @HttpCode(204)
  remove(@CurrentUser() user: User) {
    return this.profile.remove(user);
  }

  // --- Telegram agent ("Барс") ---------------------------------------------
  // Linking is optional: the bot answers unlinked chats too, it just can't
  // personalise them or write favourites on the user's behalf.

  @Get('telegram-link')
  telegramLinkStatus(@CurrentUser() user: User) {
    return this.telegramLink.status(user.id);
  }

  @Post('telegram-link')
  createTelegramLink(@CurrentUser() user: User) {
    return this.telegramLink.createToken(user.id);
  }

  @Delete('telegram-link')
  @HttpCode(204)
  removeTelegramLink(@CurrentUser() user: User) {
    return this.telegramLink.unlinkByUser(user.id);
  }
}
