import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedPostsInterface } from '@interfaces/paginatedEntity.interface';

import PaginationUtils from '@utils/pagination.utils';
import { Post } from '@v1/posts/schemas/posts.schema';
import { UpdatePostDto } from '@v1/posts/dto/update-post.dto';
import { DeleteResult, ObjectId } from 'mongodb';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export default class PostsRepository {
  constructor(@InjectModel(Post.name) private postsModel: Model<Post>) {}

  public async create(post: CreatePostDto): Promise<Post> {
    const newPost = await this.postsModel.create({
      ...post,
    });

    return newPost.toObject();
  }

  public async getById(id: ObjectId): Promise<Post | null> {
    return this.postsModel
      .findOne({
        _id: id,
      })
      .lean();
  }

  public async getOneBySlug(slug: string): Promise<Post | null> {
    return this.postsModel
      .findOne({
        slug,
      })
      .lean();
  }

  public async updateById(id: ObjectId, data: UpdatePostDto): Promise<Post | null> {
    return this.postsModel
      .findByIdAndUpdate(id, {
        $set: data,
      })
      .lean();
  }

  public async deleteById(id: ObjectId): Promise<DeleteResult> {
    return this.postsModel.deleteOne({ _id: id });
  }

  public async getPostsWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedPostsInterface> {
    const [posts, totalCount] = await Promise.all([
      this.postsModel
        .find({})
        .limit(PaginationUtils.getLimitCount(options.limit))
        .skip(PaginationUtils.getSkipCount(options.page, options.limit))
        .lean(),
      this.postsModel.count().lean(),
    ]);

    return { paginatedResult: posts, totalCount };
  }

  public async getShortPostsWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedPostsInterface> {
    const [shortPosts, totalCount] = await Promise.all([
      this.postsModel
        .find({}, { title: 1, slug: 1, excerpt: 1, date: 1, coverImage: 1, published_at: 1 })
        .limit(PaginationUtils.getLimitCount(options.limit))
        .skip(PaginationUtils.getSkipCount(options.page, options.limit))
        .lean(),
      this.postsModel.count().lean(),
    ]);

    return { paginatedResult: shortPosts, totalCount };
  }
}
