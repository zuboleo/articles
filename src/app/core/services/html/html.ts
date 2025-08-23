import { DOCUMENT, inject, Injectable, RendererFactory2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class HtmlService {
  private doc = inject(DOCUMENT);

  private renderer = inject(RendererFactory2).createRenderer(this.doc, null);

  private domSanitizer = inject(DomSanitizer);

  insert(htmlAsString: string, element: HTMLElement) {
    const safeHTML = this.domSanitizer.sanitize(SecurityContext.STYLE, htmlAsString);
    safeHTML != null && this.renderer.setProperty(element, 'innerHTML', safeHTML);
  }
}
