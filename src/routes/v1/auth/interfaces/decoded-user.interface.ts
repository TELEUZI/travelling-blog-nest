import { ObjectId } from 'mongoose';

export interface DecodedUser {
  readonly _id: ObjectId;

  readonly username: string;

  readonly email: string;

  readonly password: string;

  readonly role: string;

  readonly iat?: number;

  readonly exp?: number;
}
