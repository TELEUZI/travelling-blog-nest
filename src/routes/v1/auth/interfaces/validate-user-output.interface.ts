import { ObjectId } from 'mongodb';
import { RolesEnum } from '@decorators/roles.decorator';

export interface ValidateUserOutput {
  _id: ObjectId;
  username?: string;
  email?: string;
  role?: RolesEnum;
}
