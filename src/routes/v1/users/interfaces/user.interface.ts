import { ObjectId } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';

export interface UserInterface {
  readonly _id: ObjectId;
  readonly email: string;
  readonly password?: string;
  readonly role: RolesEnum;
}
