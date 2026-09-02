import { IsOptional, IsString } from 'class-validator';
import { IsLooseUrl } from '../../common/url';

export class CreateNewsDto {
  @IsString()
  title!: string;

  @IsString()
  shortDesc!: string;

  @IsString()
  eventDate!: string;

  @IsLooseUrl()
  imageUrl!: string;

  @IsOptional()
  @IsString()
  linkTitle?: string | null;

  @IsOptional()
  @IsLooseUrl()
  linkUrl?: string | null;
}
