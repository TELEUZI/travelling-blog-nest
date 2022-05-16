import { ApiProperty } from '@nestjs/swagger';
import { GridFSBucketReadStream } from 'mongodb';

export class ShortPost {
  @ApiProperty({ type: String })
  slug = '';

  @ApiProperty({ type: String })
  title = '';

  @ApiProperty({ type: Date })
  date: string = new Date().toISOString();

  @ApiProperty({ type: String })
  excerpt = '';

  @ApiProperty({ type: GridFSBucketReadStream })
  coverImage: GridFSBucketReadStream = new GridFSBucketReadStream();

  @ApiProperty({ type: String })
  author = '';
}
