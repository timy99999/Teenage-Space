import { IsOptional, IsString } from 'class-validator';

export class UpdateEducationTrackDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  intro?: string;
}
