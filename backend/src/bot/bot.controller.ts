import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { BotAuthGuard } from './bot-auth.guard';
import { BotService } from './bot.service';
import { TelegramLinkService } from './telegram-link.service';
import { ConfirmLinkDto, TelegramIdBodyDto, TelegramIdQueryDto } from './dto/bot.dto';

/**
 * The Telegram agent's private surface. Guarded by a shared secret rather than a user
 * JWT (see BotAuthGuard) and exempt from the global 60 req/min per-IP throttle, since
 * every chat in the bot arrives from the same egress IP.
 */
@Controller('bot')
@UseGuards(BotAuthGuard)
@SkipThrottle()
export class BotController {
  constructor(
    private readonly bot: BotService,
    private readonly links: TelegramLinkService
  ) {}

  @Get('events/sync')
  syncEvents() {
    return this.bot.syncEvents();
  }

  @Get('me')
  me(@Query() query: TelegramIdQueryDto) {
    return this.bot.me(query.telegramId);
  }

  @Post('link/confirm')
  confirmLink(@Body() dto: ConfirmLinkDto) {
    return this.links.confirm(dto.token, dto.telegramId, dto.telegramUsername);
  }

  @Delete('link')
  @HttpCode(204)
  async unlink(@Query() query: TelegramIdQueryDto) {
    await this.links.unlinkByTelegramId(query.telegramId);
  }

  @Get('favorites')
  favorites(@Query() query: TelegramIdQueryDto) {
    return this.bot.listFavorites(query.telegramId);
  }

  @Post('favorites/:eventId')
  toggleFavorite(@Param('eventId') eventId: string, @Body() dto: TelegramIdBodyDto) {
    return this.bot.toggleFavorite(dto.telegramId, eventId);
  }
}
