import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Line } from '@components/line/line';

@Component({
  selector: 'app-article-header',
  imports: [Line],
  templateUrl: './article-header.html',
  styleUrl: './article-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleHeader {
  text = input<string>('');
}
