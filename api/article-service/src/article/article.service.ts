import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma, ArticleStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';

import { generateSlug } from '../common/utils/slug.utils';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    const slug = generateSlug(createArticleDto.title);

    const exist = await this.prisma.article.findFirst({
      where: {
        OR: [
          {
            title: createArticleDto.title,
          },
          {
            slug,
          },
        ],
      },
    });

    if (exist) {
      throw new ConflictException({
        success: false,
        message: 'Artikel sudah terdaftar',
      });
    }

    const data = await this.prisma.article.create({
      data: {
        ...createArticleDto,
        slug,
      },
    });

    return {
      success: true,
      message: 'Artikel berhasil dibuat',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data,
    };
  }

  async findAll(query: QueryArticleDto) {
    const page = Number(query.page ?? 1);

    const limit = Number(query.limit ?? 10);

    const skip = (page - 1) * limit;

    const where: Prisma.ArticleWhereInput = {
      deletedAt: null,
    };

    if (query.search) {
      where.OR = [
        {
          title: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          excerpt: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    const [data, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.article.count({
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
    const data = await this.prisma.article.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Artikel tidak ditemukan',
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

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException({
        success: false,
        message: 'Artikel tidak ditemukan',
      });
    }

    const slug = updateArticleDto.title
      ? generateSlug(updateArticleDto.title)
      : article.slug;

    const exist = await this.prisma.article.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });

    if (exist) {
      throw new ConflictException({
        success: false,
        message: 'Slug artikel sudah digunakan',
      });
    }

    const data = await this.prisma.article.update({
      where: { id },
      data: {
        ...updateArticleDto,
        slug,
      },
    });

    return {
      success: true,
      message: 'Artikel berhasil diperbarui',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async remove(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException({
        success: false,
        message: 'Artikel tidak ditemukan',
      });
    }

    await this.prisma.article.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Artikel berhasil dihapus',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }

  async restore(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException({
        success: false,
        message: 'Artikel tidak ditemukan',
      });
    }

    await this.prisma.article.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });

    return {
      success: true,
      message: 'Artikel berhasil direstore',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }

  async publish(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException({
        success: false,
        message: 'Artikel tidak ditemukan',
      });
    }

    const data = await this.prisma.article.update({
      where: { id },
      data: {
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Artikel berhasil dipublish',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async featured() {
    const data = await this.prisma.article.findMany({
      where: {
        featured: true,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }
}
