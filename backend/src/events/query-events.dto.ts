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

  /** `new` — newest first (default). `deadline` — soonest registration deadline first. */
  @IsOptional()
  @IsIn(['new', 'deadline'])
  sort: 'new' | 'deadline' = 'new';
}
