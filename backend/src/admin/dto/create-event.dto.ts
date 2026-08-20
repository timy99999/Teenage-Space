import { IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  imageUrl!: string;

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
  format!: string;

  @IsIn(['free', 'paid'])
  price!: 'free' | 'paid';

  @IsOptional()
  @IsString()
  cost?: string | null;

  @IsIn(['local', 'intl'])
  level!: 'local' | 'intl';

  @IsString()
  eventDate!: string;

  @IsOptional()
  @IsString()
  deadlineDate?: string | null;

  @IsString()
  address!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  registrationUrl?: string | null;

  @IsOptional()
  @IsString()
  instagram?: string | null;
}
