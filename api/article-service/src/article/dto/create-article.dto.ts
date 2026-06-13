import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ArticleStatus } from '../enums/article-status.enum';

export class CreateArticleDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  content!: string;

  @IsString()
  categoryId!: string;

  @IsOptional()
  @IsString()
  thumbnailId?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;
}
