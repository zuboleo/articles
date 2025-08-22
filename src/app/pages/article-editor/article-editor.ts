import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TextEditor } from '../../core/components/text-editor/text-editor';
import { InputDirective } from '../../core/directives/input/input.directive';

@Component({
  selector: 'app-article-editor',
  imports: [TextEditor, InputDirective],
  templateUrl: './article-editor.html',
  styleUrl: './article-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleEditor {
  article = input<any>();

  title = computed(() =>
    this.article()?.id ? `Edit article ${this.article()?.name}` : 'Create new article'
  );
}
