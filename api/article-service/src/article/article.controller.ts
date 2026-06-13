import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ArticleService } from './article.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(
    @Body()
    createArticleDto: CreateArticleDto,
  ) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll(
    @Query()
    query: QueryArticleDto,
  ) {
    return this.articleService.findAll(query);
  }

  @Get('featured')
  featured() {
    return this.articleService.featured();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,

    @Body()
    updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.articleService.remove(id);
  }

  @Patch(':id/restore')
  restore(
    @Param('id')
    id: string,
  ) {
    return this.articleService.restore(id);
  }

  @Patch(':id/publish')
  publish(
    @Param('id')
    id: string,
  ) {
    return this.articleService.publish(id);
  }
}
