import { InputType, ObjectType } from '@nestjs/graphql';
import { ArticleCreateInput, ArticleCreateOutput } from './create-article.dto';

@InputType()
export class ArticleUpdateInput extends ArticleCreateInput {}

@ObjectType()
export class ArticleUpdateOutput extends ArticleCreateOutput {}
