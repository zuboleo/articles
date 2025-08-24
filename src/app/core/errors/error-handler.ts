import { ErrorHandler, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification/notification.service';
import { NoSelectedRangeError } from './no-selected-range-error';
import { NotFoundError } from './not-found-error';

export class ArticlesErrorHandler implements ErrorHandler {
  private router = inject(Router);

  private notificationService = inject(NotificationService);

  handleError(error: any): void {
    if (error instanceof NotFoundError) {
      this.router.navigate(['/', 'not-found'], {});
    }

    if (error instanceof NoSelectedRangeError) {
      this.notificationService.showError(error.message);
    }

    this.notificationService.showError(error?.message || 'Unknown error');

    console.error(error);
  }
}
