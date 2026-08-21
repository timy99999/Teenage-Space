import { IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title!: string;

  @IsString()
  shortDesc!: string;

  @IsString()
  eventDate!: string;

  @IsString()
  imageUrl!: string;

  @IsOptional()
  @IsString()
  linkTitle?: string | null;

  @IsOptional()
  @IsString()
  linkUrl?: string | null;
}
