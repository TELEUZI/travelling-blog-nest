import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '@decorators/roles.decorator';
import { ObjectId } from 'mongodb';

export default class UsersEntity {
  @ApiProperty({ type: String })
  _id: ObjectId = new ObjectId();

  @ApiProperty({ type: 'enum', enum: RolesEnum })
  role: RolesEnum = RolesEnum.USER;

  @ApiProperty({ type: Boolean })
  verified = true;

  @ApiProperty({ type: String })
  username = 'Anon';

  @ApiProperty({ type: String })
  email = '';

  @ApiProperty({ type: String })
  password = '';
}
