import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export async function notExistDestinasi(
  prisma: PrismaService,
  id: number,
  message: string,
) {
  const data = await prisma.destinasi.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!data) {
    throw new NotFoundException({
      success: false,
      message,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  return data;
}