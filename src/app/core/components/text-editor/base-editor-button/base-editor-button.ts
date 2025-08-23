import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommandName } from '@type/command-name.type';

@Component({
  selector: 'app-base-editor-button',
  template: '',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseEditorButton {
  icon = input.required({ transform: (icon) => `fa-${icon}` });

  command = input.required<CommandName>();

  exec = output<[CommandName, ...any[]]>();
}
