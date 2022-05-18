import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
