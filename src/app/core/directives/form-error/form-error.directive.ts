import { Directive } from '@angular/core';

@Directive({
  selector: '[app-form-error]',
  host: {
    '[class.error]': 'true',
  },
})
export class FormErrorDirective {
  constructor() {}
}
