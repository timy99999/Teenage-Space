import { ForbiddenException, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { FavoritesService } from '../favorites/favorites.service';
import { EventRow, mapEvent } from '../common/mappers';
import { TelegramLinkService } from './telegram-link.service';

@Injectable()
export class BotService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly favorites: FavoritesService,
    private readonly links: TelegramLinkService
  ) {}

  /**
   * Full catalogue snapshot for the bot's RAG indexer.
   *
   * Deliberately not incremental: `events` has a created_at but no updated_at, so an
   * edit to an existing row is invisible to a "since" filter. The indexer instead
   * hashes each event's text and re-embeds only what actually changed — which needs
   * every row anyway. The catalogue is dozens of rows, so this stays cheap.
   *
   * Archived events are included (flagged) so the indexer can drop their embeddings.
   */
  async syncEvents() {
    const { data, error } = await this.supabase.client
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;

    return ((data ?? []) as EventRow[]).map((row) => ({
      ...mapEvent(row),
      createdAt: row.created_at
    }));
  }

  /** Who the bot is talking to. Unlinked chats are normal, not an error. */
  async me(telegramId: number) {
    const userId = await this.links.resolveUserId(telegramId);
    if (!userId) return { linked: false as const, profile: null, favorites: [] as string[] };

    const [profile, favorites] = await Promise.all([
      this.links.profileFor(userId),
      this.favorites.list(userId)
    ]);
    return { linked: true as const, profile, favorites };
  }

  async listFavorites(telegramId: number) {
    const userId = await this.requireLinkedUser(telegramId);
    return this.favorites.list(userId);
  }

  async toggleFavorite(telegramId: number, eventId: string) {
    const userId = await this.requireLinkedUser(telegramId);
    return this.favorites.toggle(userId, eventId);
  }

  private async requireLinkedUser(telegramId: number): Promise<string> {
    const userId = await this.links.resolveUserId(telegramId);
    if (!userId) throw new ForbiddenException('Telegram chat is not linked to an account');
    return userId;
  }
}
