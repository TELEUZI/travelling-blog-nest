import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesService } from './services/files.service';
import { FilesController } from './files.controller';
import { GridFsMulterConfigService } from './services/fs-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [FilesController],
  providers: [GridFsMulterConfigService, FilesService],
})
export class FilesModule {}
