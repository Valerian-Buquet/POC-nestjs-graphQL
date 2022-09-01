import { Args, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import {
  ArticlePagination,
  ArticlePaginationArgs,
} from '../dto/article-pagination.dto';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticlesQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlePagination)
  async getArticles(@Args() args: ArticlePaginationArgs) {
    return this.articleService.getAll(args);
  }
}
