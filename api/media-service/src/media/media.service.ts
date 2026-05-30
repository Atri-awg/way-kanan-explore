import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMediaDto: CreateMediaDto) {
    const exist = await this.prisma.media.findFirst({
      where: {
        fileName: createMediaDto.fileName,
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

    await this.prisma.media.create({
      data: createMediaDto,
    });

    return {
      success: true,
      message: 'Media berhasil ditambahkan',
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  async findAll() {
    const data = await this.prisma.media.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Data media tidak ditemukan',
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    return {
      success: true,
      message: '',
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data,
    };
  }

  async findOne(id: string) {
    const media = await this.prisma.media.findUnique({
      where: { id },
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
      message: '',
      metadata: {
        status: HttpStatus.OK,
      },
      data: media,
    };
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    try {
      const media = await this.prisma.media.findUnique({
        where: { id },
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
        data: updateMediaDto,
      });

      return {
        success: true,
        message: 'Media berhasil diperbarui',
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
        message: 'Gagal memperbarui media',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  async remove(id: string) {
    try {
      const media = await this.prisma.media.findUnique({
        where: { id },
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

      await this.prisma.media.delete({
        where: { id },
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
}
