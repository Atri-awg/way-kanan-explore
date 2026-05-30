import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { MediaType } from '@prisma/client';

export class CreateMediaDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsUrl()
  url!: string;

  @IsString()
  publicId!: string;

  @IsEnum(MediaType)
  type!: MediaType;

  @IsOptional()
  @IsString()
  destinationId?: string;

  @IsOptional()
  @IsString()
  articleId?: string;
}
