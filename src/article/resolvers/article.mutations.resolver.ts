import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from '../dto/create-article.dto';
import { ArticleDeleteOutput } from '../dto/delete-article.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dto/update-article.dto';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleMutationResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleCreateOutput)
  async articleCreate(@Args('input') input: ArticleCreateInput) {
    return this.articleService.create(input);
  }

  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @Args({ name: 'id', type: () => ID }) id: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.update(id, input);
  }

  @Mutation(() => ArticleDeleteOutput)
  async articleDelete(@Args({ name: 'id', type: () => ID }) id: Article['id']) {
    return this.articleService.delete(id);
  }
}
