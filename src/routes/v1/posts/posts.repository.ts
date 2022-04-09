import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedPostsInterface, PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';

import PaginationUtils from '@utils/pagination.utils';
import { Post, PostDocument } from '@v1/posts/schemas/posts.schema';
import { UpdatePostDto } from '@v1/posts/dto/update-post.dto';

@Injectable()
export default class PostsRepository {
  constructor(@InjectModel(Post.name) private postsModel: Model<PostDocument>) {}

  public async create(user: SignUpDto): Promise<Post> {
    const newUser = await this.postsModel.create({
      ...user,
      verified: false,
    });

    return newUser.toObject();
  }

  public async getByEmail(email: string): Promise<Post | null> {
    return this.postsModel
      .findOne({
        email,
      })
      .lean();
  }

  public async getVerifiedUserByEmail(email: string): Promise<Post | null> {
    return this.postsModel
      .findOne({
        email,
        verified: true,
      })
      .lean();
  }

  public async getUnverifiedUserByEmail(email: string): Promise<Post | null> {
    return this.postsModel
      .findOne({
        email,
        verified: false,
      })
      .lean();
  }

  public async getById(id: Types.ObjectId): Promise<Post | null> {
    return this.postsModel
      .findOne(
        {
          _id: id,
        },
        { password: 0 },
      )
      .lean();
  }

  public async getVerifiedUserById(id: Types.ObjectId): Promise<Post | null> {
    return this.postsModel
      .findOne(
        {
          _id: id,
          verified: true,
        },
        { password: 0 },
      )
      .lean();
  }

  public async getUnverifiedUserById(id: Types.ObjectId): Promise<Post | null> {
    return this.postsModel
      .findOne(
        {
          _id: id,
          verified: false,
        },
        { password: 0 },
      )
      .lean();
  }

  public async updateById(id: Types.ObjectId, data: UpdatePostDto): Promise<Post | null> {
    return this.postsModel
      .findByIdAndUpdate(id, {
        $set: data,
      })
      .lean();
  }

  public async getAllVerifiedWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedPostsInterface> {
    const verified = true;
    const [users, totalCount] = await Promise.all([
      this.postsModel
        .find(
          {
            verified,
          },
          {
            password: 0,
          },
        )
        .limit(PaginationUtils.getLimitCount(options.limit))
        .skip(PaginationUtils.getSkipCount(options.page, options.limit))
        .lean(),
      this.postsModel.count({ verified }).lean(),
    ]);

    return { paginatedResult: users, totalCount };
  }
}
