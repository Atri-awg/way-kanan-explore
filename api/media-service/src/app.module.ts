import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';

import { MediaModule } from './media/media.module';

import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PrismaModule, MediaModule, UploadModule],
})
export class AppModule {}
