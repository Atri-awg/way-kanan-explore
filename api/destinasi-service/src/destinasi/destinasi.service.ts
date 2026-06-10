import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const destinasi = await this.prisma.destinasi.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!destinasi) {
      throw new NotFoundException('Destinasi tidak ditemukan');
    }

    return destinasi;
  }

  async update(id: number, dto: UpdateDestinasiDto) {
    await this.findOne(id);

    return this.prisma.destinasi.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.destinasi.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
