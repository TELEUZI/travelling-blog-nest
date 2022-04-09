import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RolesEnum } from '@decorators/roles.decorator';

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email = '';

  @Prop({
    required: true,
    type: String,
  })
  password = '';

  @Prop({
    required: true,
    type: Boolean,
  })
  verified = false;

  @Prop({
    type: String,
    enum: RolesEnum,
    required: false,
    default: RolesEnum.USER,
  })
  role: RolesEnum = RolesEnum.USER;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User).set('versionKey', false);
