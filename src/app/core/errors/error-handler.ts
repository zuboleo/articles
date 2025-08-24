import { ErrorHandler, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification/notification.service';
import { NotFoundError } from './not-found-error';

export class ArticlesErrorHandler implements ErrorHandler {
  private router = inject(Router);

  private notificationService = inject(NotificationService);

  handleError(error: any): void {
    if (error instanceof NotFoundError) {
      this.router.navigate(['/', 'not-found'], {});
    }

    this.notificationService.showError(error?.message || 'Unknown error');

    console.error(error);
  }
}
