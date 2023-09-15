import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import LocalFilesInterceptor from './localFiles.interceptor';

@Controller('file')
class FileController {
  constructor(
  ) {}

  @Post('upload')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}

export default FileController;
