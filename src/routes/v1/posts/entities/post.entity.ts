import { ApiProperty } from '@nestjs/swagger';
import UsersEntity from '@v1/users/entity/user.entity';
import { User } from '@v1/users/schemas/users.schema';
import { RolesEnum } from '@decorators/roles.decorator';

export class Post  {
  @ApiProperty({ type: String })
  readonly email: string = '';

  @ApiProperty({ type: String })
  readonly password: string = '';

  @ApiProperty({ type: String })
  readonly slug: string = '';

  @ApiProperty({ type: String })
  readonly title : string = '';

  @ApiProperty({ type: Date })
   date : string = new Date().toISOString();

  @ApiProperty({ type: UsersEntity })
  author: User  = { email: '', password: '', role: RolesEnum.USER, verified: false };

  @ApiProperty({ type: String })
  excerpt : string = '';

  @ApiProperty({ type: String })
  content : string = '';
}
