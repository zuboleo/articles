import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@components/button/button';
import { HtmlService } from '@services/html/html';
import { Article } from '@type/article.type';
import { ArticleHeader } from '../article-header/article-header';

@Component({
  selector: 'app-article',
  imports: [ArticleHeader, Button, RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  private html = inject(HtmlService);

  article = input.required<Article>();

  protected articleTextContainer = viewChild<ElementRef<HTMLElement>>('articleTextContainer');

  constructor() {
    effect(() => this.setArticleText());
  }

  private setArticleText(): void {
    const article = this.article().article;
    const elRef = this.articleTextContainer()?.nativeElement;

    if (article && elRef) {
      this.html.insert(article, elRef);
    }
  }
}
