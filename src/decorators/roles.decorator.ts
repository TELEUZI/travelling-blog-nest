import { SetMetadata } from '@nestjs/common';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
  AUTHOR = 'author',
}

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
