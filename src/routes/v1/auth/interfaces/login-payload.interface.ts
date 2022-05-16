import { ObjectId } from 'mongoose';

export interface LoginPayload {
  readonly _id?: ObjectId;

  readonly email: string;
}
