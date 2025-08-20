import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/components/header/header';
import { Main } from './pages/main/main';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Main, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('article');
}
