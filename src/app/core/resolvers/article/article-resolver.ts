import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticleApiService } from '@services/article-api/article-api.service';
import { Article } from '@type/article.type';

export const articleResolver: ResolveFn<Article> = (route) => {
  const api = inject(ArticleApiService);
  const id = route.params['id'];

  return api.getById(id);
};
