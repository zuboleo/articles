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
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Button } from '@components/button/button';
import { Line } from '@components/line/line';
import { HtmlService } from '@services/html/html';
import { CommandName } from '@type/command-name.type';
import { EditorButton } from './editor-button/editor-button';
import { EditorColorButton } from './editor-color-button/editor-color-button';
import { createCommands, debounce, mutationObserverOptions } from './utils';

@Component({
  selector: 'app-text-editor',
  imports: [Button, Line, EditorButton, EditorColorButton],
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

  protected value = model('');

  protected onChange: (val: string | null | undefined | number) => void = () => {};

  protected onTouch: () => void = () => {};

  protected disabled = signal(false);

  protected contentEditable = computed(() => (this.disabled() ? 'false' : 'true'));

  editor = viewChild<ElementRef<HTMLDivElement>>('editor');

  save = output<string>();

  clear = output<void>();

  constructor() {
    effect(() => this.startObserve());
    effect(() => this.insertData());
  }

  ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }

  protected execute(cmd: CommandName, ...args: any[]) {
    const selection = this.doc.getSelection();

    if (selection) {
      const range = selection.getRangeAt(0);
      const cmdFn = this.getCommandFunction(cmd);
      cmdFn(range, args);
    }
  }

  protected saveValue(editor: HTMLDivElement) {
    this.save.emit(editor.innerHTML);
  }

  protected clearValue(editor: HTMLDivElement) {
    this.html.insert('', editor);
    this.clear.emit();
  }

  writeValue(obj: string | null | undefined | number): void {
    const value = obj ?? '';
    this.value.set(value.toString());
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

  private insertData() {
    const editor = this.editor()?.nativeElement;
    const value = this.value();

    if (editor && value) {
      this.html.insert(value, editor);
    }
  }

  private getCommandFunction(cmd: CommandName) {
    return this.commands[cmd];
  }
}
