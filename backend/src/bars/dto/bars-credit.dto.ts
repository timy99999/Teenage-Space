import { Type } from 'class-transformer';
import { IsISO8601, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class BarsCreditDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100000)
  toppedUpUsd!: number;

  /** Date the top-up was made (YYYY-MM-DD). Defaults to today when omitted. */
  @IsOptional()
  @IsISO8601()
  toppedUpAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  note?: string;
}
