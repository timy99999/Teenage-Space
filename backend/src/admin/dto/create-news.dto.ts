import { IsOptional, IsString, IsUrl } from 'class-validator';

const URL_OPTS = { protocols: ['http', 'https'], require_protocol: true };

export class CreateNewsDto {
  @IsString()
  title!: string;

  @IsString()
  shortDesc!: string;

  @IsString()
  eventDate!: string;

  @IsUrl(URL_OPTS)
  imageUrl!: string;

  @IsOptional()
  @IsString()
  linkTitle?: string | null;

  @IsOptional()
  @IsUrl(URL_OPTS)
  linkUrl?: string | null;
}
