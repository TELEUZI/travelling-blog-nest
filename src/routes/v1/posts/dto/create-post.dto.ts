import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '@v1/users/schemas/users.schema';
import { RolesEnum } from '@decorators/roles.decorator';
import { Optional } from '@nestjs/common';
import UsersEntity from '@v1/users/entity/user.entity';

export class CreatePostDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly email: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly password: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly slug: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly title : string = '';

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly date : string = new Date().toISOString();

  @ApiProperty({ type: UsersEntity })
  @IsNotEmpty()
  readonly author: User  = { email: '', password: '', role: RolesEnum.USER, verified: false };

  @ApiProperty({ type: String })
  @Optional()
  @IsString()
  readonly excerpt : string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly content : string = '';
}
