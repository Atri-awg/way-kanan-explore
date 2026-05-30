import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MediaType, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMediaDto: CreateMediaDto) {
    const exist = await this.prisma.media.findFirst({
      where: {
        deletedAt: null,
        OR: [
          {
            title: createMediaDto.title,
          },
          {
            publicId: createMediaDto.publicId,
          },
        ],
      },
    });

    if (exist) {
      throw new ConflictException({
        success: false,
        message: 'Media sudah terdaftar',
        metadata: {
          status: HttpStatus.CONFLICT,
        },
      });
    }

    const media = await this.prisma.media.create({
      data: createMediaDto,
    });

    return {
      success: true,
      message: 'Media berhasil ditambahkan',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: media,
    };
  }

  async findAll(page = 1, limit = 10, search?: string, type?: MediaType) {
    const skip = (page - 1) * limit;

    const where: Prisma.MediaWhereInput = {
      deletedAt: null,
    };

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (type) {
      where.type = type;
    }

    const [data, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.media.count({
        where,
      }),
    ]);

    return {
      success: true,
      metadata: {
        status: HttpStatus.OK,
        page,
        limit,
        total_data: total,
      },
      data,
    };
  }

  async findOne(id: string) {
    const media = await this.prisma.media.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!media) {
      throw new NotFoundException({
        success: false,
        message: 'Media tidak ditemukan',
        metadata: {
          status: HttpStatus.NOT_FOUND,
        },
      });
    }

    return {
      success: true,
      metadata: {
        status: HttpStatus.OK,
      },
      data: media,
    };
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    try {
      const media = await this.prisma.media.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!media) {
        throw new NotFoundException({
          success: false,
          message: 'Media tidak ditemukan',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      if (updateMediaDto.title) {
        const exist = await this.prisma.media.findFirst({
          where: {
            deletedAt: null,
            NOT: {
              id,
            },
            title: updateMediaDto.title,
          },
        });

        if (exist) {
          throw new ConflictException({
            success: false,
            message: 'Judul media sudah digunakan',
            metadata: {
              status: HttpStatus.CONFLICT,
            },
          });
        }
      }

      const updated = await this.prisma.media.update({
        where: { id },
        data: updateMediaDto,
      });

      return {
        success: true,
        message: 'Media berhasil diperbarui',
        metadata: {
          status: HttpStatus.OK,
        },
        data: updated,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Gagal memperbarui media',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  async remove(id: string) {
    try {
      const media = await this.prisma.media.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!media) {
        throw new NotFoundException({
          success: false,
          message: 'Media tidak ditemukan',
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      await this.prisma.media.update({
        where: { id },
        data: {
          status: false,
          deletedAt: new Date(),
        },
      });

      return {
        success: true,
        message: 'Media berhasil dihapus',
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: 'Gagal menghapus media',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  async restore(id: string) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException({
        success: false,
        message: 'Media tidak ditemukan',
      });
    }

    await this.prisma.media.update({
      where: { id },
      data: {
        deletedAt: null,
        status: true,
      },
    });

    return {
      success: true,
      message: 'Media berhasil direstore',
      metadata: {
        status: HttpStatus.OK,
      },
    };
  }
}
