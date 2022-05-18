import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import Serialize from '@decorators/serialization.decorator';
import JwtAccessGuard from '@guards/jwt-access.guard';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import {
  PaginatedPostsInterface,
  PaginatedShortPostsInterface,
} from '@interfaces/paginatedEntity.interface';
import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
import { DeleteResult, ObjectId } from 'mongodb';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import PostResponseEntity from './entities/post-response.entity';
import PaginationUtils, { PaginationRequestParams } from '../../../utils/pagination.utils';
import ResponseUtils from '../../../utils/response.utils';
import { Post as PostModel } from './entities/post.entity';

@ApiTags('Posts')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(PostModel)
@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAccessGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(createPostDto);
  }

  @ApiOkResponse({
    description: '200. Success. Returns all posts',
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PostModel),
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get()
  @Serialize(PostResponseEntity)
  @UseGuards(JwtAccessGuard)
  async getFullPosts(@Query() query: PaginationRequestParams): Promise<PostResponseEntity> {
    const paginationParams: PaginationParamsInterface | false =
      PaginationUtils.normalizeParams(query);
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedPosts: PaginatedPostsInterface =
      await this.postsService.getAllPostsWithPagination(paginationParams);

    return ResponseUtils.success('posts', paginatedPosts.paginatedResult, {
      location: 'posts',
      paginationParams,
      totalCount: paginatedPosts.totalCount,
    });
  }

  @Get('short/page')
  @Serialize(PostResponseEntity)
  @UseGuards(JwtAccessGuard)
  async getShortPosts(@Query() query: PaginationRequestParams): Promise<PostResponseEntity> {
    const paginationParams: PaginationParamsInterface | false =
      PaginationUtils.normalizeParams(query);
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedShortPosts: PaginatedShortPostsInterface =
      await this.postsService.getShortPostsWithPagination(paginationParams);

    return ResponseUtils.success('posts', paginatedShortPosts.paginatedResult, {
      location: 'posts',
      paginationParams,
      totalCount: paginatedShortPosts.totalCount,
    });
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PostModel),
        },
      },
    },
    description: '200. Success. Returns a post',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Post was not found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get(':id')
  @UseGuards(JwtAccessGuard)
  findOne(@Param('id') slug: string): Promise<PostModel | null> {
    return this.postsService.findPostBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAccessGuard)
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel | null> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessGuard)
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<DeleteResult> {
    return this.postsService.remove(id);
  }
}
