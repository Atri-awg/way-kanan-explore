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

  async findAll(query: QueryReviewDto) {
    const page = Number(query.page ?? 1);

    const limit = Number(query.limit ?? 10);

    const skip = (page - 1) * limit;

    const where: Prisma.ReviewWhereInput = {
      deletedAt: null,
    };

    if (query.destinationId) {
      where.destinationId = query.destinationId;
    }

    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.review.count({
        where,
      }),
    ]);

    return {
      success: true,
      metadata: {
        status: HttpStatus.OK,
        total_data: total,
        page,
        limit,
      },
      data,
    };
  }

  async findOne(id: string) {
    const data = await this.prisma.review.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Review tidak ditemukan',
      });
    }

    return {
      success: true,
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException({
        success: false,
        message: 'Review tidak ditemukan',
      });
    }

    const data = await this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });

    return {
      success: true,
      message: 'Review berhasil diperbarui',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }
}
