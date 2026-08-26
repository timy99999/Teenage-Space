import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

const URL_OPTS = { protocols: ['http', 'https'], require_protocol: true };

export class UpdateEventDto {
  @IsOptional()
  @IsUrl(URL_OPTS)
  imageUrl?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

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
  @IsUrl(URL_OPTS)
  registrationUrl?: string | null;

  @IsOptional()
  @IsString()
  extraLinkTitle?: string | null;

  @IsOptional()
  @IsUrl(URL_OPTS)
  extraLinkUrl?: string | null;

  @IsOptional()
  @IsString()
  instagram?: string | null;

  @IsOptional()
  @IsString()
  telegram?: string | null;
}
