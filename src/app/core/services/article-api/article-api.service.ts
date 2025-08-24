import { inject, Injectable } from '@angular/core';
import { ALL_RECORDS } from '@constants/articles-keys';
import { NotFoundError } from '@errors/not-found-error';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { Article } from '@type/article.type';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleApiService {
  private localStorage = inject(LocalStorageService);

  getList() {
    return of(this.getRecords());
  }

  getById(articleId: string) {
    const records = this.getRecords();
    const article = records.find(({ id }) => id === articleId);

    if (article) return of(article);
    else return this.throwNotFoundError(articleId);
  }

  createArticle(article: Article) {
    article.id = crypto.randomUUID();
    const records = this.getRecords();
    records.push(article);
    this.localStorage.save(ALL_RECORDS, records);

    return of(article);
  }

  updateArticle(article: Article) {
    const records = this.getRecords();
    const index = records.findIndex(({ id }) => id === article.id);

    if (index < 0) {
      return this.throwNotFoundError(article.id);
    } else {
      records.splice(index, 1, article);
      this.localStorage.save(ALL_RECORDS, records);

      return of(article);
    }
  }

  deleteArticle(articleId: string) {
    let records = this.getRecords();
    const article = records.find(({ id }) => id === articleId);

    if (article) {
      records = records.filter(({ id }) => id !== article.id);
      this.localStorage.save(ALL_RECORDS, records);
      return of(article);
    } else {
      return this.throwNotFoundError(articleId);
    }
  }

  private getRecords() {
    return this.localStorage.get<Article[]>(ALL_RECORDS) || [];
  }

  private throwNotFoundError(id: string) {
    return throwError(() => new NotFoundError(`Record with id [${id}] not found`));
  }
}
