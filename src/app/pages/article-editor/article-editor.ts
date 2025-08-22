import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-article-editor',
  imports: [],
  templateUrl: './article-editor.html',
  styleUrl: './article-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleEditor {}
