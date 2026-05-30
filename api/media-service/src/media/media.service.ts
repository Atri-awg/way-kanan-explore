import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(data: any) {
    return this.prisma.media.create({
      data,
    });
  }

  findAll() {
    return this.prisma.media.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  update(id: string, data: any) {
    return this.prisma.media.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.media.delete({
      where: { id },
    });
  }
}
