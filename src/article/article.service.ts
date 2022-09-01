import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticlePagination,
  ArticlePaginationArgs,
} from './dto/article-pagination.dto';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dto/create-article.dto';
import { ArticleDeleteOutput } from './dto/delete-article.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto/update-article.dto';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(input: ArticleCreateInput): Promise<ArticleCreateOutput> {
    const newArticle = this.articleRepository.create(input);
    const article = await this.articleRepository.save(newArticle);
    return { article };
  }

  async update(
    id: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    const article = await this.articleRepository.findOneOrFail(id);

    article.title = input.title;
    article.description = input.description;

    await article.save();

    return { article };
  }

  async delete(id: Article['id']): Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOneOrFail(id);
    article.remove();
    return { id };
  }

  async getAll(args: ArticlePaginationArgs): Promise<ArticlePagination> {
    const [nodes, totalCount] = await this.articleRepository.findAndCount({
      skip: args.skip,
      take: args.take,
    });

    return { nodes, totalCount };
  }
}
