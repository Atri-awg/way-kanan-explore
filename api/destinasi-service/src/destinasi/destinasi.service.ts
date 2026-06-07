import { Injectable } from '@nestjs/common';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinasiService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDestinasiDto) {
    return this.prisma.destinasi.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.destinasi.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} destinasi`;
  }

  update(id: number, updateDestinasiDto: UpdateDestinasiDto) {
    return `This action updates a #${id} destinasi`;
  }

  remove(id: number) {
    return `This action removes a #${id} destinasi`;
  }
}
