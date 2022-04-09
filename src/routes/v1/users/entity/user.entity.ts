import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '@decorators/roles.decorator';

export default class UsersEntity {
  @ApiProperty({ type: String })
  _id: Types.ObjectId = new Types.ObjectId();

  @ApiProperty({ type: 'enum', enum: RolesEnum })
  role: RolesEnum = RolesEnum.USER;

  @ApiProperty({ type: Boolean })
  verified = false;

  @ApiProperty({ type: String })
  email = '';

  @ApiProperty({ type: String })
  password = '';
}
