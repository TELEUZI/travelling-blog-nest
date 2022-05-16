/* eslint-disable max-classes-per-file */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class Comment {
  @Prop({
    required: true,
    type: String,
  })
  content = '5';

  @Prop({
    required: true,
    type: String,
  })
  author = '';
}

export const CommentSchema = SchemaFactory.createForClass(Comment).set('versionKey', false);

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
    type: [Comment],
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
