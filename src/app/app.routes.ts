import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'article',
    pathMatch: 'full',
  },
  {
    path: 'article',
    loadComponent: () => import('./pages/article-list/article-list'),
  },
  {
    path: 'article/:id',
    loadComponent: () => import('./pages/article-list/article-list'),
  },
  {
    path: 'article/edit/:id',
    loadComponent: () => import('./pages/article-list/article-list'),
  },
];
