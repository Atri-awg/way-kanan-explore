import { HttpStatus, NotFoundException } from '@nestjs/common';

export async function notExistDestinasi(
  model: any,
  id: number,
  message: string,
) {
  const data = await model.findFirst({
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
