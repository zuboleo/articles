import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BUTTON_CLASS_PAIRS } from './util';

@Component({
  selector: `
  button[primary-button],
  button[secondary-button],
  button[icon-button],
  button[neutral],
  `,
  host: {
    '[disabled]': 'disabled()',
  },
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Button {
  private host: HTMLButtonElement = inject(ElementRef).nativeElement;

  disabled = input(false);

  constructor() {
    for (let { attribute, buttonClasses } of BUTTON_CLASS_PAIRS) {
      if (this.host.hasAttribute(attribute)) {
        this.host.classList.add(...buttonClasses);
      }
    }

    effect(() => {
      if (this.disabled()) this.host.classList.add('disabled');
      else this.host.classList.remove('disabled');
    });
  }
}
