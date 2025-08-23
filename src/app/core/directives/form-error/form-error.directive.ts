import { AfterViewInit, Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map, merge, Subject } from 'rxjs';

@Directive({
  selector: '[app-form-error]',
  host: {
    '(blur)': 'checkStatus()',
  },
})
export class FormErrorDirective implements AfterViewInit {
  private control = inject(NgControl);

  private elRef: HTMLElement = inject(ElementRef).nativeElement;

  private renderer = inject(Renderer2);

  private errorRef: HTMLElement | null = null;

  private statusCheck = new Subject<void>();

  error = input<Record<string, string>>({}, { alias: 'app-form-error' });

  ngAfterViewInit(): void {
    if (this.control.statusChanges) {
      merge(this.statusCheck, this.control.statusChanges)
        .pipe(
          debounceTime(200),
          map(() => this.control.invalid && (this.control.touched || this.control.dirty))
        )
        .subscribe(() => {
          this.showError(this.control.errors);
        });
    }
  }

  protected checkStatus() {
    this.statusCheck.next();
  }

  private removeError(): void {
    this.errorRef?.remove();
  }

  private showError(errors: ValidationErrors | null): void {
    this.removeError();

    if (errors) {
      this.errorRef = this.renderer.createElement('span');
      this.renderer.addClass(this.errorRef, 'error');
      this.renderer.setProperty(
        this.errorRef,
        'textContent',
        Object.keys(errors).reduce((a, c) => {
          const err = this.error()[c];
          return !!err ? a.concat(a.length ? ', ' : '' + err) : a;
        }, '')
      );

      this.renderer.appendChild(this.elRef.parentElement, this.errorRef);
    }
  }
}
