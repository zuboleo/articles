import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-current-date',
  imports: [DatePipe],
  templateUrl: './current-date.html',
  styleUrl: './current-date.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentDate {
  protected date = new Date();
}
