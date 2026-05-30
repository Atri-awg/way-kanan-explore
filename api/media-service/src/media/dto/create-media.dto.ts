import { IsEnum, IsOptional, IsString } from 'class-validator';

import { MediaType } from '../enums/media-type.enum';

export class CreateMediaDto {
  @IsString()
  title: string;

  @IsOptional()
  description?: string;

  @IsEnum(MediaType)
  fileType: MediaType;

  @IsString()
  fileName: string;

  @IsString()
  filePath: string;
}