import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { notExistDestinasi } from 'src/common/utils/not-exist-destinasi.util';

@Injectable()
export class DestinasiService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDestinasiDto) {
    const data = await this.prisma.destinasi.create({
      data: dto,
    });

    return {
      success: true,
      message: process.env.SUCCESS_SAVE,
      metadata: {
        status: HttpStatus.CREATED,
      },
      data,
    };
  }

  async findAll() {
    return this.prisma.destinasi.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: number) {
    const data = await notExistDestinasi(
      this.prisma,
      id,
      'Destinasi tidak ditemukan',
    );

    return {
      success: true,
      message: 'Berhasil mengambil detail destinasi',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async update(id: number, dto: UpdateDestinasiDto) {
    await notExistDestinasi(this.prisma, id, 'Destinasi tidak ditemukan');
    const data = await this.prisma.destinasi.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      message: 'Berhasil memperbarui destinasi',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }

  async remove(id: number) {
    await notExistDestinasi(this.prisma, id, 'Destinasi tidak ditemukan');
    const data = await this.prisma.destinasi.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Berhasil menghapus destinasi',
      metadata: {
        status: HttpStatus.OK,
      },
      data,
    };
  }
}
