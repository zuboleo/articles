import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
  {
    path: 'articles',
    loadComponent: () => import('./pages/article-list/article-list'),
  },
];
