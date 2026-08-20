import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsArray()
  themes?: string[];

  @IsInt()
  ageMin!: number;

  @IsInt()
  ageMax!: number;

  @IsString()
  ageLabel!: string;

  @IsIn(['free', 'paid'])
  price!: 'free' | 'paid';

  @IsOptional()
  @IsString()
  cost?: string | null;

  @IsIn(['local', 'intl'])
  level!: 'local' | 'intl';

  @IsString()
  format!: string;

  @IsString()
  eventDate!: string;

  @IsOptional()
  @IsString()
  deadlineDate?: string | null;

  @IsString()
  place!: string;

  @IsString()
  shortDesc!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsBoolean()
  instagram?: boolean;

  @IsOptional()
  @IsString()
  registrationUrl?: string | null;

  @IsString()
  imageUrl!: string;
}
