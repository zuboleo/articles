import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextEditor } from '@components/text-editor/text-editor';
import { InputDirective } from '@directives/input/input.directive';

const v = `<u>Lorem ipsum do<span title="lor, sit amet cons" style="text-decoration: underline wavy green; cursor: pointer;">lor, sit amet cons</span>e</u>ctetur adipisicing elit. Deleniti a<i>liquam nihil veniam iure e</i>veniet aliquid eum temporibus id <span title="doloremque eius asperiores," style="text-decoration: underline wavy green; cursor: pointer;">doloremque eius asperiores,</span> maxime porro ut adipisci. Consequatur iure ipsa archvitecto veniam?`;

@Component({
  selector: 'app-article-editor',
  imports: [TextEditor, InputDirective, ReactiveFormsModule],
  templateUrl: './article-editor.html',
  styleUrl: './article-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleEditor {
  protected article = input<any>();

  protected title = computed(() =>
    this.article()?.id ? `Edit article ${this.article()?.name}` : 'Create new article'
  );

  protected form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    article: new FormControl<string>(v, { nonNullable: true }),
  });
}
