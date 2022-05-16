import {
  PaginatedPostsInterface,
  PaginatedShortPostsInterface,
} from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { Injectable } from '@nestjs/common';
import { FilesService } from '@v1/files/services/files.service';
import { DeleteResult, ObjectId } from 'mongodb';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import PostsRepository from './posts.repository';
import { Post } from './schemas/posts.schema';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostsRepository, private fileService: FilesService) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.create({ ...createPostDto });
  }

  public async getAllPostsWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedPostsInterface> {
    return this.postRepository.getPostsWithPagination(options);
  }

  public async getShortPostsWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedShortPostsInterface> {
    const shortPosts = await this.postRepository.getShortPostsWithPagination(options);
    // const ids = shortPosts.paginatedResult.map((post) => post.coverImage);
    // const images = await Promise.all(ids.map((id) => this.fileService.readStream(id.toString())));
    const posts = shortPosts.paginatedResult.map((post) => ({
      ...post,
      coverImage: post.coverImage.toString(),
    }));
    return { paginatedResult: posts as any, totalCount: shortPosts.totalCount };
  }

  public async findPostBySlug(slug: string): Promise<Post | null> {
    return this.postRepository.getOneBySlug(slug);
  }

  findPostById(id: ObjectId): Promise<Post | null> {
    return this.postRepository.getById(id);
  }

  update(id: ObjectId, updatePostDto: UpdatePostDto): Promise<Post | null> {
    return this.postRepository.updateById(id, { ...updatePostDto });
  }

  remove(id: ObjectId): Promise<DeleteResult> {
    return this.postRepository.deleteById(id);
  }
}
