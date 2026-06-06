import { Module } from '@nestjs/common';
import { DestinasiService } from './destinasi.service';
import { DestinasiController } from './destinasi.controller';

@Module({
  controllers: [DestinasiController],
  providers: [DestinasiService],
})
export class DestinasiModule {}
