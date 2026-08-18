import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryEventsDto {
  @IsOptional()
  @IsIn(['upcoming', 'past', 'all'])
  scope: 'upcoming' | 'past' | 'all' = 'upcoming';

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  categories?: string;

  @IsOptional()
  @IsString()
  themes?: string;

  @IsOptional()
  @IsIn(['free', 'paid'])
  price?: 'free' | 'paid';

  @IsOptional()
  @IsIn(['local', 'intl'])
  level?: 'local' | 'intl';

  @IsOptional()
  @IsString()
  age?: string;
}
