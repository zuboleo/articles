import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@components/button/button';

@Component({
  selector: 'app-empty-article-list',
  imports: [Button, RouterLink],
  templateUrl: './empty-article-list.html',
  styleUrl: './empty-article-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyArticleList {}
