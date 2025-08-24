import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrentDate } from '@components/current-date/current-date';
import { Line } from '@components/line/line';

@Component({
  selector: 'app-header',
  imports: [Line, CurrentDate],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
