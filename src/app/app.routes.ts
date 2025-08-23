import { Routes } from '@angular/router';
import { articleResolver } from '@resolvers/article/article-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'article',
    pathMatch: 'full',
  },
  {
    path: 'article',
    loadComponent: () => import('./pages/article-list/article-list'),
    title: 'Articles',
  },
  {
    path: 'article/create',
    loadComponent: () => import('./pages/article-editor/article-editor'),
    title: 'Create article',
  },
  {
    path: 'article/:id',
    loadComponent: () => import('./pages/article-list/article-list'),
    title: 'Article',
  },
  {
    path: 'article/edit/:id',
    loadComponent: () => import('./pages/article-editor/article-editor'),
    title: 'Edit article',
    resolve: {
      article: articleResolver,
    },
  },
];
