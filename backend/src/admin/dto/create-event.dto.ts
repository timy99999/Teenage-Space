import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

const URL_OPTS = { protocols: ['http', 'https'], require_protocol: true };

export class CreateEventDto {
  @IsUrl(URL_OPTS)
  imageUrl!: string;

  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsArray()
  themes?: string[];

  @IsInt()
  @Min(0)
  @Max(99)
  ageMin!: number;

  @IsInt()
  @Min(0)
  @Max(99)
  ageMax!: number;

  @IsString()
  format!: string;

  @IsIn(['free', 'paid'])
  price!: 'free' | 'paid';

  @IsOptional()
  @IsString()
  cost?: string | null;

  @IsOptional()
  @IsBoolean()
  charity?: boolean;

  @IsIn(['local', 'intl'])
  level!: 'local' | 'intl';

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
  address?: string | null;

  @IsOptional()
  @IsString()
  audience?: string | null;

  @IsString()
  description!: string;

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
