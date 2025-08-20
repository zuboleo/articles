import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../../../core/components/button/button';
import { ArticleHeader } from '../article-header/article-header';

@Component({
  selector: 'app-article',
  imports: [ArticleHeader, Button],
  templateUrl: './article.html',
  styleUrl: './article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Article {}
