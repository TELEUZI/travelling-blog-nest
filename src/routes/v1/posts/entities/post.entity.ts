import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class Post {
  @ApiProperty({ type: String })
  slug = '';

  @ApiProperty({ type: String })
  title = '';

  @ApiProperty({ type: Date })
  date: string = new Date().toISOString();

  @ApiProperty({ type: String })
  author = '';

  @ApiProperty({ type: String })
  excerpt = '';

  @ApiProperty({ type: String })
  content = '';

  @ApiProperty({ type: ObjectId })
  coverImage: ObjectId = new ObjectId();
}
