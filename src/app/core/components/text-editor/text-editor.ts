import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';
import { InputDirective } from '../../directives/input/input.directive';
import { Button } from '../button/button';

@Component({
  selector: 'app-text-editor',
  imports: [Button, InputDirective],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditor {
  private doc = inject(DOCUMENT);

  execute(cmd: string, arg1: null, arg2: boolean) {
    this.doc.execCommand(cmd);
  }

  private getDocumnet(textEditor: HTMLIFrameElement) {
    return textEditor.contentDocument || textEditor.contentWindow?.document;
  }
}
