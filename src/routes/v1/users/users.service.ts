import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';

import { User } from '@v1/users/schemas/users.schema';
import { ObjectId } from 'mongodb';
import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(user: SignUpDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: user.email,
      username: user.username,
    });
  }

  public getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getVerifiedUserById(id: ObjectId): Promise<User | null> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public getUnverifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getUnverifiedUserByEmail(email);
  }

  public getUnverifiedUserById(id: ObjectId): Promise<User | null> {
    return this.usersRepository.getUnverifiedUserById(id);
  }

  public update(id: ObjectId, data: UpdateUserDto): Promise<User | null> {
    return this.usersRepository.updateById(id, data);
  }

  public async getAllVerifiedWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedUsersInterface> {
    return this.usersRepository.getAllVerifiedWithPagination(options);
  }
}
