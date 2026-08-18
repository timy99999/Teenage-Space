import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/supabase-user.decorator';
import type { User } from '@supabase/supabase-js';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
@UseGuards(SupabaseAuthGuard)
export class FavoritesController {
  constructor(private readonly favorites: FavoritesService) {}

  @Get()
  list(@CurrentUser() user: User) {
    return this.favorites.list(user.id);
  }

  @Post(':eventId')
  toggle(@CurrentUser() user: User, @Param('eventId') eventId: string) {
    return this.favorites.toggle(user.id, eventId);
  }
}
