import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinasiDto } from './create-destinasi.dto';

export class UpdateDestinasiDto extends PartialType(CreateDestinasiDto) {}
