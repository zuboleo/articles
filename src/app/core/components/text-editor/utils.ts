import { DOCUMENT, inject } from '@angular/core';
import { CommandName } from '@type/command-name.type';

export function createCommands(): Record<CommandName, (...args: any[]) => void> {
  const doc = inject(DOCUMENT);

  return {
    bold: (range: Range) => {
      range.surroundContents(doc.createElement('b'));
    },
    italic: (range: Range) => {
      range.surroundContents(doc.createElement('i'));
    },
    underline: (range: Range) => {
      range.surroundContents(doc.createElement('u'));
    },
    paragraph: (range: Range) => {
      const p = doc.createElement('p');
      p.style.textIndent = '2em';
      range.surroundContents(p);
    },
    highlightColor: (range: Range, color: string) => {
      const span = doc.createElement('span');
      span.style.backgroundColor = color;
      range.surroundContents(span);
    },
    textColor: (range: Range, color: string) => {
      const span = doc.createElement('span');
      span.style.color = color;
      range.surroundContents(span);
    },
    comment: (_: Range, [range, text, color]: [Range, ...string[]]) => {
      const span = doc.createElement('span');

      Object.assign(span.style, {
        textDecoration: `${color} solid underline`,
        textDecorationThickness: '2px',
        cursor: 'pointer',
      });

      span.setAttribute('title', text.trim());
      range.surroundContents(span);
    },
    trash: (range: Range) => {
      range.deleteContents();
    },
  };
}
