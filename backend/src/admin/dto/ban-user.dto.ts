import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export const BAN_DURATIONS = ['day', 'week', 'month', 'forever'] as const;
export type BanDuration = (typeof BAN_DURATIONS)[number];

export class BanUserDto {
  @IsIn(BAN_DURATIONS)
  duration!: BanDuration;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
