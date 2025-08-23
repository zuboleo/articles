import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommandName } from '../../types/command-name.type';
import { Button } from '../button/button';
import { Line } from '../line/line';
import { EditorButton } from './editor-button/editor-button';
import { EditorColorButton } from './editor-color-button/editor-color-button';
import { createCommands } from './utils';

@Component({
  selector: 'app-text-editor',
  imports: [Button, Line, EditorButton, EditorColorButton],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditor {
  private doc = inject(DOCUMENT);

  private commands = createCommands();

  private domSanitizer = inject(DomSanitizer);

  execute(cmd: CommandName, ...args: any[]) {
    const selection = this.doc.getSelection();

    if (selection) {
      const range = selection.getRangeAt(0);
      const cmdFn = this.getCommandFunction(cmd);
      cmdFn(range, args);
    }
  }

  save(editor: HTMLDivElement) {
    console.log(editor.innerHTML);
  }

  clear(editor: HTMLDivElement) {
    const emptyContent = this.domSanitizer.sanitize(SecurityContext.HTML, '');
    if (typeof emptyContent === 'string') editor.innerHTML = emptyContent;
  }

  private getCommandFunction(cmd: CommandName) {
    return this.commands[cmd];
  }
}
