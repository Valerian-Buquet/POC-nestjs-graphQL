import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from 'src/building-blocks/dto/pagination.dto';
import { Article } from '../models/article.model';

@InputType()
export class ArticlePaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  title?: SortDirection;
}

@ArgsType()
export class ArticlePaginationArgs extends PaginationArgs {
  @Field(() => ArticlePaginationSortBy, { nullable: true })
  sortBy?: ArticlePaginationSortBy;
}

@ObjectType()
export class ArticlePagination extends Pagination {
  @Field(() => [Article])
  nodes: Article[];
}
