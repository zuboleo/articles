import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from '@components/button/button';
import { TextEditor } from '@components/text-editor/text-editor';
import { FormErrorDirective } from '@directives/form-error/form-error.directive';
import { InputDirective } from '@directives/input/input.directive';
import { ArticleApiService } from '@services/article-api/article-api.service';
import { Article } from '@type/article.type';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-article-editor',
  imports: [
    TextEditor,
    InputDirective,
    ReactiveFormsModule,
    FormErrorDirective,
    Button,
    RouterLink,
  ],
  templateUrl: './article-editor.html',
  styleUrl: './article-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleEditor {
  private api = inject(ArticleApiService);

  private router = inject(Router);

  protected article = input<Article>();

  protected title = computed(() => (this.article()?.id ? 'Edit article' : 'Create new article'));

  constructor() {
    effect(() => {
      const article = this.article();
      !!article && this.form.patchValue(article);
    });
  }

  protected form = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }),
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    article: new FormControl<string>('', { nonNullable: true }),
  });

  protected async saveArticle() {
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched({ emitEvent: true });

    if (this.form.invalid) return;

    const article = this.form.getRawValue();

    if (article.id) await firstValueFrom(this.api.updateArticle(article));
    else await firstValueFrom(this.api.createArticle(article));

    this.router.navigate(['/']);
  }

  protected cancel() {
    const { article, ...rest } = this.form.getRawValue();
    this.form.reset();
    this.form.markAllAsTouched();
    this.router.navigate(['/']);
  }
}
