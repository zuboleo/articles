import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputDirective } from '../../../directives/input/input.directive';
import { Button } from '../../button/button';
import { BaseEditorButton } from '../base-editor-button/base-editor-button';

@Component({
  selector: 'app-editor-color-button',
  imports: [Button, InputDirective],
  templateUrl: './editor-color-button.html',
  styleUrl: './editor-color-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorColorButton extends BaseEditorButton {}
