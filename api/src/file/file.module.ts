import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import FileController from './file.controller';

@Module({
  imports: [ConfigModule],
  controllers: [FileController],
})
export default class FileModule {}
