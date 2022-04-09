import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '@v1/users/schemas/users.schema';

@Schema()
export class Post {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  slug = '';

  @Prop({
    required: true,
    unique: false,
    type: String,
  })
  title = '';

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  date = new Date().toISOString();

  @Prop({
    required: true,
    unique: true,
    type: User,
  })
  author = {};

  @Prop({
    required: false,
    type: String,
  })
  excerpt = '';

  @Prop({
    required: true,
    type: String,
  })
  content = '5';
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post).set('versionKey', false);
