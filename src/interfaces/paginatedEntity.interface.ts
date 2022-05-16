import { User } from '@v1/users/schemas/users.schema';
import { Post } from '@v1/posts/schemas/posts.schema';
import { ShortPost } from '@v1/posts/entities/short-post.entity';

export interface PaginatedUsersInterface {
  readonly paginatedResult: User[] | [];
  readonly totalCount: number;
}

export interface PaginatedPostsInterface {
  readonly paginatedResult: Post[] | [];
  readonly totalCount: number;
}
export interface PaginatedShortPostsInterface {
  readonly paginatedResult: ShortPost[] | [];
  readonly totalCount: number;
}
