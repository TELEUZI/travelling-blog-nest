import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: any;

  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: process.env.MONGODB_URL || '',
      file: (req, file) => {
        return new Promise((resolve) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename,
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
