import { Module } from '@nestjs/common';
import { Post, PostSchema } from '@v1/posts/schemas/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
