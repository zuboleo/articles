import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-line',
  imports: [],
  templateUrl: './line.html',
  styleUrl: './line.scss',
  host: {
    '[style.backgroundColor]': 'color()',
    '[style.width]': 'lineWidth()',
    '[style.height]': 'lineHeight()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Line {
  color = input<string>('var(--gray-800)');

  width = input<string>('1px');

  vertical = input<boolean>(false);

  protected lineWidth = computed(() => (this.vertical() ? this.width() : '100%'));

  protected lineHeight = computed(() => (this.vertical() ? '100%' : this.width()));
}
