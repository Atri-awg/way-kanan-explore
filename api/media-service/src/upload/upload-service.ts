import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  upload(file: Express.Multer.File) {
    return {
      filename: file.filename,
      path: file.path,
    };
  }
}
