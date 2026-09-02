import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { IsLooseUrl } from '../../common/url';

export class UpdateEventDto {
  @IsOptional()
  @IsLooseUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsArray()
  themes?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  ageMin?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  ageMax?: number;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsIn(['free', 'paid'])
  price?: 'free' | 'paid';

  @IsOptional()
  @IsString()
  cost?: string | null;

  @IsOptional()
  @IsBoolean()
  charity?: boolean;

  @IsOptional()
  @IsIn(['local', 'intl'])
  level?: 'local' | 'intl';

  @IsOptional()
  @IsString()
  eventDate?: string | null;

  @IsOptional()
  @IsString()
  eventDateEnd?: string | null;

  @IsOptional()
  @IsString()
  eventTime?: string | null;

  @IsOptional()
  @IsString()
  deadlineDate?: string | null;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  audience?: string | null;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsLooseUrl()
  registrationUrl?: string | null;

  @IsOptional()
  @IsString()
  extraLinkTitle?: string | null;

  @IsOptional()
  @IsLooseUrl()
  extraLinkUrl?: string | null;

  @IsOptional()
  @IsString()
  instagram?: string | null;

  @IsOptional()
  @IsString()
  telegram?: string | null;
}
