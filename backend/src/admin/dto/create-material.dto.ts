import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  track!: string;

  @IsString()
  title!: string;

  @IsString()
  meta!: string;

  @IsArray()
  body!: string[];

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
