import { Directive, effect, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[app-input]',
  host: {
    '[class.input]': 'true',
    '[class.app-input]': 'true',
    '[id]': 'id',
    '[attr.value]': 'model()',
    '[attr.required]': 'required()',
    '(input)': 'writeNewValue($any($event.target).value, true)',
    '(blur)': 'onTouch()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDirective),
      multi: true,
    },
  ],
})
export class InputDirective implements ControlValueAccessor {
  isDisabled = false;

  disabled = input(false);

  id = crypto.randomUUID();

  required = input(false);

  model = model<string | number | null | undefined | object>();

  onTouch: () => void = () => {};

  onChange: (val: any) => void = () => {};

  constructor() {
    effect(() => (this.isDisabled = this.disabled()));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: string | number): void {
    this.writeNewValue(obj, false);
  }

  writeNewValue(value: any, emitEvent: boolean) {
    this.model.set(value);

    if (emitEvent) {
      this.onChange(value);
      this.onTouch();
    }
  }
}
