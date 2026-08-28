import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * Telegram chat/user ids exceed 2^31 but stay well inside Number.MAX_SAFE_INTEGER,
 * so a JS number is safe; they arrive as strings on the query string.
 */
export class TelegramIdQueryDto {
  @Type(() => Number)
  @IsInt()
  telegramId!: number;
}

export class TelegramIdBodyDto {
  @Type(() => Number)
  @IsInt()
  telegramId!: number;
}

export class ConfirmLinkDto {
  @IsString()
  @MaxLength(128)
  token!: string;

  @Type(() => Number)
  @IsInt()
  telegramId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  telegramUsername?: string;
}
