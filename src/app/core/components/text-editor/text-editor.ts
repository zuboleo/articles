import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  forwardRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Line } from '@components/line/line';
import { debounce } from '@constants/debounce';
import { mutationObserverOptions } from '@constants/mutation-observer';
import { HtmlService } from '@services/html/html';
import { CommandName } from '@type/command-name.type';
import { CommentButton } from './comment-button/comment-button';
import { EditorButton } from './editor-button/editor-button';
import { EditorColorButton } from './editor-color-button/editor-color-button';
import { createCommands } from './utils';

@Component({
  selector: 'app-text-editor',
  imports: [Line, EditorButton, EditorColorButton, CommentButton],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditor),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditor implements ControlValueAccessor, OnDestroy {
  private doc = inject(DOCUMENT);

  private commands = createCommands();

  private html = inject(HtmlService);

  private observeMutation: MutationCallback = () => {
    this.onChange(this.editor()!.nativeElement.innerHTML);
  };

  private mutationObserver = new MutationObserver(debounce(this.observeMutation, 300, this));

  protected onChange: (val: string | null | undefined | number) => void = () => {};

  protected onTouch: () => void = () => {};

  protected disabled = signal(false);

  protected contentEditable = computed(() => (this.disabled() ? 'false' : 'true'));

  editor = viewChild<ElementRef<HTMLDivElement>>('editor');

  constructor() {
    effect(() => this.startObserve());
  }

  ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }

  protected execute(cmd: CommandName, ...args: any[]) {
    const selection = this.doc.getSelection();

    if (selection) {
      const range = selection.getRangeAt(0);
      const cmdFn = this.getCommandFunction(cmd);
      cmdFn(range, ...args);
    }
  }

  writeValue(obj: string | null | undefined | number): void {
    const value = obj ?? '';
    this.insertData(value.toString());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private startObserve() {
    const editor = this.editor()?.nativeElement;

    if (editor) this.mutationObserver.observe(editor, mutationObserverOptions);
  }

  private insertData(value: string) {
    const editor = this.editor()?.nativeElement;

    if (editor && value != null) {
      this.html.insert(value, editor);
    }
  }

  private getCommandFunction(cmd: CommandName) {
    return this.commands[cmd];
  }
}
