import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleApiService } from '@services/article-api/article-api.service';
import { ArticleComponent } from './components/article/article';
import { EmptyArticleList } from './components/empty-article-list/empty-article-list';

@Component({
  selector: 'app-article-list',
  imports: [ArticleComponent, EmptyArticleList],
  templateUrl: './article-list.html',
  styleUrl: './article-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleList {
  private api = inject(ArticleApiService);

  protected articles = toSignal(this.api.getList());
}
