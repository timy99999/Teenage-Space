import { IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title!: string;

  @IsString()
  shortDesc!: string;

  @IsString()
  eventDate!: string;

  @IsString()
  imageUrl!: string;
}
