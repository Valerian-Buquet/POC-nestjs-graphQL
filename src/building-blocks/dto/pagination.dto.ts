import {
  ArgsType,
  Field,
  Int,
  InterfaceType,
  registerEnumType,
} from '@nestjs/graphql';
import { BaseModel } from '../models/baseModel.model';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}

export enum SortDirection {
  ASC,
  DESC,
}

registerEnumType(SortDirection, { name: 'SortDirection' });

@InterfaceType()
export class PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  createdAt?: SortDirection;
}

@InterfaceType()
export abstract class Pagination<N extends BaseModel = BaseModel> {
  @Field()
  totalCount: number;

  @Field(() => [BaseModel])
  abstract nodes: N[];
}
