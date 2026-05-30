import { NotFoundException } from '@nestjs/common';

export async function notExistMedia<T = unknown>(
  mediaModel: {
    findUnique: (args: { where: { id: string } }) => Promise<T | null>;
  },
  id: string,
  message: string,
): Promise<T> {
  const media = await mediaModel.findUnique({ where: { id } });

  if (!media) {
    throw new NotFoundException({
      success: false,
      message,
    });
  }

  return media;
}
