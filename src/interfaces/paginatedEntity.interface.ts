import { User } from '@v1/users/schemas/users.schema';
import { Post } from '@v1/posts/schemas/posts.schema';

export interface PaginatedUsersInterface {
  readonly paginatedResult: User[] | [],
  readonly totalCount: number,
}

export interface PaginatedPostsInterface {
  readonly paginatedResult: Post[] | [],
  readonly totalCount: number,
}
