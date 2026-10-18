import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { IsLooseUrl } from '../../common/url';
import { ExtraLinkDto } from '../../common/extra-link.dto';

export class CreateEventDto {
  @IsLooseUrl()
  imageUrl!: string;

  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

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
  @IsString()
  organizerName?: string | null;

  @IsOptional()
  @IsLooseUrl()
  organizerUrl?: string | null;

  @IsOptional()
  @IsLooseUrl()
  registrationUrl?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExtraLinkDto)
  extraLinks?: ExtraLinkDto[];

  @IsOptional()
  @IsString()
  instagram?: string | null;

  @IsOptional()
  @IsString()
  telegram?: string | null;
}
