/* eslint-disable max-classes-per-file */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { CommentSchema } from './Comment';

@Schema()
export class Post {
  @Prop({
    required: true,
    unique: false,
    type: String,
  })
  title = '';

  @Prop({
    required: true,
    type: String,
  })
  content = '5';

  @Prop({
    required: false,
    type: String,
  })
  excerpt = '';

  @Prop({
    required: true,
    type: String,
  })
  date = new Date().toISOString();

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  slug = '';

  @Prop({
    required: true,
    type: String,
  })
  author = '';

  @Prop({
    required: false,
    type: [CommentSchema],
  })
  comments = [];

  @Prop({
    required: false,
    type: [String],
  })
  tags = [];

  @Prop({
    required: false,
    type: ObjectId,
  })
  coverImage: ObjectId = new ObjectId();
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post).set('versionKey', false);
