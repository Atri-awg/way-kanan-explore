import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

// Buat fungsi untuk pengecekan data kategori
export const notExistKategori = async (
  prisma: PrismaService['kategori'],
  id: number,
  message: string,
) => {
  // Tampilkan data kategori berdasarkan id
  const data = await prisma.findUnique({
    where: { id: id },
  });

  // jika data kategori tidak ditemukan
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  // jika data kategori ditemukan
  return data;
};

// export async function notExistKategori() {

// }
