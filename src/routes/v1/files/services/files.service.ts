import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';

import { FileInfoVm } from '../entities/file.entity';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const result = await this.fileModel
      .findById(id)
      .catch(() => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      })
      .then((res) => res);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async findAllFiles(): Promise<FileInfoVm[]> {
    return this.fileModel
      .find({})
      .catch(() => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      })
      .then((res) =>
        res.map((result) => ({
          filename: result.filename,
          length: result.length,
          chunkSize: result.chunkSize,
          md5: result.md5,
          contentType: result.contentType,
        })),
      );
  }

  async deleteFile(id: string): Promise<boolean> {
    return this.fileModel.delete(id);
  }
}
