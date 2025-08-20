import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Article } from './components/article/article';

@Component({
  selector: 'app-article-list',
  imports: [Article],
  templateUrl: './article-list.html',
  styleUrl: './article-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleList {}
