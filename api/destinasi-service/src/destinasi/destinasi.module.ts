import { Module } from '@nestjs/common';
import { DestinasiService } from './destinasi.service';
import { DestinasiController } from './destinasi.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DestinasiController],
  providers: [DestinasiService],
})
export class DestinasiModule {}