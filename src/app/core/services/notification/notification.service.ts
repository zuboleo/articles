import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private container: HTMLElement | null = null;

  private doc = inject(DOCUMENT);

  showError(message: string) {
    this.createContainer(message, ['notification-error']);
  }

  private createContainer(message: string, cssClasses: string[]) {
    this.container?.remove();
    this.container = this.doc.createElement('div');
    this.container.classList.add('notification', ...cssClasses);
    this.container.textContent = message;
    this.doc.body.appendChild(this.container);

    setTimeout(() => {
      this.container?.remove();
    }, 5000);
  }
}
