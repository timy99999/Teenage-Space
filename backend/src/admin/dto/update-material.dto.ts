import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  track?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  meta?: string;

  @IsOptional()
  @IsArray()
  body?: string[];

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
