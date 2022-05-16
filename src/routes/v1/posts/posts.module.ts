import { Module } from '@nestjs/common';
import { CommentSchema, Comment, Post, PostSchema } from '@v1/posts/schemas/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from '@v1/files/files.module';
import { FilesService } from '@v1/files/services/files.service';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import PostsRepository from './posts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      { name: Comment.name, schema: CommentSchema },
    ]),
    FilesModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, FilesService],
  exports: [PostsService, PostsRepository],
})
export class PostsModule {}
