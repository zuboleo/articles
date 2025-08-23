import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '@components/button/button';
import { BaseEditorButton } from '../base-editor-button/base-editor-button';

@Component({
  selector: 'app-editor-button',
  imports: [Button],
  templateUrl: './editor-button.html',
  styleUrl: './editor-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorButton extends BaseEditorButton {}
