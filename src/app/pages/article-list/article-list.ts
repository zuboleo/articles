import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Button } from '@components/button/button';
import { ArticleApiService } from '@services/article-api/article-api.service';
import { ArticleComponent } from './components/article/article';
import { EmptyArticleList } from './components/empty-article-list/empty-article-list';

@Component({
  selector: 'app-article-list',
  imports: [ArticleComponent, EmptyArticleList, RouterLink, Button],
  templateUrl: './article-list.html',
  styleUrl: './article-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleList {
  private api = inject(ArticleApiService);

  protected articles = toSignal(this.api.getList());
}
