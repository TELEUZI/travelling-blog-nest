/* eslint-disable max-classes-per-file */
import { Type, Transform } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

class Data {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: ObjectId = new ObjectId();

  slug = '';

  title = '';

  date: string = new Date().toISOString();

  author = '';

  excerpt = '';

  content = '';
}

export default class PostResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => Data)
  data?: [
    {
      _id: ObjectId;

      slug: string;

      title: string;

      date: string;

      author: string;

      excerpt: string;

      content: string;
    },
  ] = [
    {
      _id: new ObjectId(),

      slug: '',

      title: '',

      date: new Date().toISOString(),

      author: '',

      excerpt: '',

      content: '',
    },
  ];

  collectionName?: string = '';

  options?: {
    location: string;
    paginationParams: PaginationParamsInterface;
    totalCount: number;
  };
}
