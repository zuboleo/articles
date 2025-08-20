import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleHeader } from '../article-header/article-header';

@Component({
  selector: 'app-article',
  imports: [ArticleHeader],
  templateUrl: './article.html',
  styleUrl: './article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Article {}
