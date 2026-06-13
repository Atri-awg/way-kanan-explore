import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, Review } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const data = await this.prisma.review.create({
      data: createReviewDto,
    });

    return {
      success: true,
      message: 'Review berhasil dibuat',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data,
    };
  }
}
