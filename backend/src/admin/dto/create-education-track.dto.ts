import { IsOptional, IsString } from 'class-validator';

export class CreateEducationTrackDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  intro?: string;
}
