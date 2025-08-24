import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@components/button/button';

@Component({
  selector: 'app-not-found-error',
  imports: [Button, RouterLink],
  templateUrl: './not-found-error.html',
  styleUrl: './not-found-error.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundError {}
