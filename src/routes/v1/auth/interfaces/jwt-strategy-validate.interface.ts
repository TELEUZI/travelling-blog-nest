import { ObjectId } from 'mongodb';
import { RolesEnum } from '@decorators/roles.decorator';

export interface JwtStrategyValidate {
  _id: ObjectId;
  email: string;
  username: string;
  role: RolesEnum;
}
