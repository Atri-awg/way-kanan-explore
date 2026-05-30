import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';

import { generateSlug } from '../common/utils/slug.utils';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = generateSlug(createCategoryDto.name);

    const exist = await this.prisma.category.findFirst({
      where: {
        OR: [
          {
            name: createCategoryDto.name,
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
        message: 'Kategori sudah terdaftar',
      });
    }

    const data = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        slug,
      },
    });

    return {
      success: true,
      message: 'Kategori berhasil ditambahkan',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data,
    };
  }

  async findAll(query: QueryCategoryDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,
      ...(query.search && {
        name: {
          contains: query.search,
          mode: 'insensitive' as const,
        },
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.category.count({
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
    const data = await this.prisma.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!data) {
      throw new NotFoundException({
        success: false,
        message: 'Kategori tidak ditemukan',
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException({
        success: false,
        message: 'Kategori tidak ditemukan',
      });
    }

    const slug = updateCategoryDto.name
      ? generateSlug(updateCategoryDto.name)
      : category.slug;

    const exist = await this.prisma.category.findFirst({
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
        message: 'Kategori sudah digunakan',
      });
    }

    const data = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
        slug,
      },
    });

    return {
      success: true,
      message: 'Kategori berhasil diperbarui',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException({
        success: false,
        message: 'Kategori tidak ditemukan',
      });
    }

    await this.prisma.category.update({
      where: { id },
      data: {
        status: false,
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Kategori berhasil dihapus',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }

  async restore(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException({
        success: false,
        message: 'Kategori tidak ditemukan',
      });
    }

    await this.prisma.category.update({
      where: { id },
      data: {
        status: true,
        deletedAt: null,
      },
    });

    return {
      success: true,
      message: 'Kategori berhasil direstore',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }
}
