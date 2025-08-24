import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from '@components/button/button';
import { Line } from '@components/line/line';
import { ArticleApiService } from '@services/article-api/article-api.service';
import { HtmlService } from '@services/html/html';
import { Article } from '@type/article.type';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-article-view',
  imports: [Line, Button, RouterLink],
  templateUrl: './article-view.html',
  styleUrl: './article-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleView {
  private html = inject(HtmlService);

  private api = inject(ArticleApiService);

  private router = inject(Router);

  protected article = input.required<Article>();

  protected articleContainer = viewChild<ElementRef<HTMLElement>>('articleContainer');

  constructor() {
    effect(() => this.insertArticle());
  }

  protected async removeArticle() {
    await firstValueFrom(this.api.deleteArticle(this.article().id));
    this.router.navigate(['/']);
  }

  private insertArticle() {
    const article = this.article();
    const articleContainer = this.articleContainer()?.nativeElement;

    if (article && articleContainer) {
      this.html.insert(article.article, articleContainer);
    }
  }
}
