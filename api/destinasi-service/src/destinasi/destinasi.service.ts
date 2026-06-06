import { Injectable } from '@nestjs/common';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';

@Injectable()
export class DestinasiService {
  create(createDestinasiDto: CreateDestinasiDto) {
    return 'This action adds a new destinasi';
  }

  findAll() {
    return `This action returns all destinasi`;
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
