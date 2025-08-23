import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@components/button/button';
import { CurrentDate } from '@components/current-date/current-date';
import { Line } from '@components/line/line';

@Component({
  selector: 'app-header',
  imports: [Line, CurrentDate, Button, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
