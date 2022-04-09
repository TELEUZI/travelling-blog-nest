/* eslint-disable max-classes-per-file */
import { Exclude, Type, Transform } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { RolesEnum } from '@decorators/roles.decorator';

class Data {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: ObjectId = new ObjectId();

  role: RolesEnum = RolesEnum.USER;

  verified = false;

  email = '';

  @Exclude()
  password = '';
}

export default class UserResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => Data)
  data?: [
    {
      _id: ObjectId;

      role: string;

      verified: boolean;

      email: string;

      password: string;
    },
  ] = [
    {
      _id: new ObjectId(),

      role: '',

      verified: true,

      email: '',

      password: '',
    },
  ];

  collectionName?: string = '';

  options?: {
    location: string;
    paginationParams: PaginationParamsInterface;
    totalCount: number;
  };
}
