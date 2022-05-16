import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Res,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FilesService } from './services/files.service';
import { FileResponseVm } from './entities/file-response-vm.model';
import { FileInfoVm } from './entities/file.entity';

@ApiTags('Files')
@ApiBearerAuth()
@ApiExtraModels(FileInfoVm)
@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('file'))
  upload(@UploadedFiles() files: any[]) {
    return files.map((file) => ({
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      id: file.id,
      filename: file.filename,
      metadata: file.metadata,
      bucketName: file.bucketName,
      chunkSize: file.chunkSize,
      size: file.size,
      md5: file.md5,
      uploadDate: file.uploadDate,
      contentType: file.contentType,
    }));
  }

  @Get('info/:id')
  async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file info',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'File has been detected',
      file,
    };
  }

  @Get('')
  async getFiles() {
    const files = await this.filesService.findAllFiles();
    if (!files) {
      throw new HttpException(
        'An error occurred while retrieving files',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return files;
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res);
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', `attachment; filename=${file.filename}`);
    return filestream.pipe(res);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: FileResponseVm })
  async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.deleteFile(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred during file deletion',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'File has been deleted',
      file,
    };
  }
}
