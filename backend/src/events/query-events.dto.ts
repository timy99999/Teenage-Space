import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class QueryEventsDto {
  @IsOptional()
  @IsIn(['upcoming', 'past', 'all'])
  scope: 'upcoming' | 'past' | 'all' = 'upcoming';

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  categories?: string;

  @IsOptional()
  @IsString()
  themes?: string;

  @IsOptional()
  @IsIn(['free', 'paid'])
  price?: 'free' | 'paid';

  @IsOptional()
  @IsIn(['local', 'intl'])
  level?: 'local' | 'intl';

  // Attendance format. `online` widens to online+hybrid, `offline` to offline+hybrid,
  // `hybrid` matches hybrid only — so the "Онлайн" preset (mode=online) still shows
  // hybrid events. Junk 400s, same as price/level (frontend strips unknown values).
  @IsOptional()
  @IsIn(['offline', 'online', 'hybrid'])
  mode?: 'offline' | 'online' | 'hybrid';

  // MaxLength is a size guard only — a malformed but short value (e.g. "abc") is
  // still accepted here and silently ignored by the service's regex, matching the
  // frontend's "ignore junk from stale links" behaviour.
  @IsOptional()
  @IsString()
  @MaxLength(11)
  age?: string;

  /**
   * Free-text search over title + description. Used by the "Возможности" catalog only
   * (news / education are out of scope). LIKE metacharacters are escaped downstream.
   */
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MaxLength(100)
  q?: string;

  /**
   * `new` — newest first (default). `deadline` — soonest registration deadline first.
   * Anything unrecognised (a stale or hand-edited link) falls back to `new` rather
   * than 400-ing, matching how `age` / `themes` treat junk values.
   */
  @Transform(({ value }) => (value === 'deadline' ? 'deadline' : 'new'))
  @IsString()
  sort: 'new' | 'deadline' = 'new';
}
