import { Directive, effect, ElementRef, forwardRef, inject, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[app-input]',
  host: {
    '[class.input]': 'true',
    '[class.app-input]': 'true',
    '[id]': 'id',
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
  private elRef: HTMLInputElement = inject(ElementRef).nativeElement;

  protected isDisabled = false;

  protected disabled = input(false);

  protected id = crypto.randomUUID();

  protected required = input(false);

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

  protected writeNewValue(value: any, emitEvent: boolean) {
    this.elRef.value = value;

    if (emitEvent) {
      this.onChange(value);
      this.onTouch();
    }
  }
}
