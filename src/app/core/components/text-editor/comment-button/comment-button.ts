import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  effect,
  ElementRef,
  inject,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '@components/button/button';
import { InputDirective } from '@directives/input/input.directive';
import { NoSelectedRangeError } from '@errors/no-selected-range-error';
import { BaseEditorButton } from '../base-editor-button/base-editor-button';
import { colors } from '../utils';

@Component({
  selector: 'app-comment-button',
  imports: [Button, InputDirective, FormsModule],
  templateUrl: './comment-button.html',
  styleUrl: './comment-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentButton extends BaseEditorButton {
  private doc = inject(DOCUMENT);

  protected range: Range | null = null;

  protected popoverId = crypto.randomUUID();

  protected popoverRef = viewChild<ElementRef<HTMLElement>>('popoverRef');

  protected colors = colors;

  protected selectedColor = signal(colors[0]);

  protected comment = model('');

  constructor() {
    super();

    effect(() => this.setPopoverId());
  }

  private setPopoverId() {
    const popoverRef = this.popoverRef()?.nativeElement;
    if (popoverRef) {
      popoverRef.id = this.popoverId;
    }
  }

  protected checkSelection() {
    const selection = this.doc.getSelection();
    try {
      this.range = selection?.getRangeAt(0) ?? null;
    } catch (error) {
      throw new NoSelectedRangeError();
    }

    if (!this.range?.toString()) {
      throw new NoSelectedRangeError();
    }
  }

  protected resetValues() {
    this.selectedColor.set(colors[0]);
    this.comment.set('');
  }
}
