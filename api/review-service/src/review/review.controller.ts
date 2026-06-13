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

import { ReviewService } from './review.service';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(
    @Body()
    createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll(
    @Query()
    query: QueryReviewDto,
  ) {
    return this.reviewService.findAll(query);
  }

  @Get('destination/:destinationId/rating')
  getAverageRating(
    @Param('destinationId')
    destinationId: string,
  ) {
    return this.reviewService.getAverageRating(destinationId);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,

    @Body()
    updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.reviewService.remove(id);
  }

  @Patch(':id/restore')
  restore(
    @Param('id')
    id: string,
  ) {
    return this.reviewService.restore(id);
  }
}
