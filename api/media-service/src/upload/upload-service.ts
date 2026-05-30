import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  upload(file: Express.Multer.File) {
    return {
      success: true,
      message: 'File berhasil diupload',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: {
        originalName: file.originalname,
        fileName: file.filename,
        filePath: file.path,
        mimeType: file.mimetype,
        size: file.size,
      },
    };
  }
}
