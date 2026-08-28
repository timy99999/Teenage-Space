import { Module } from '@nestjs/common';
import { FavoritesModule } from '../favorites/favorites.module';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { TelegramLinkService } from './telegram-link.service';

@Module({
  imports: [FavoritesModule],
  controllers: [BotController],
  providers: [BotService, TelegramLinkService],
  // ProfileModule mints the deep links from the site side.
  exports: [TelegramLinkService]
})
export class BotModule {}
