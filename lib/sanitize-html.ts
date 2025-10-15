import { JSDOM } from 'jsdom';
import createDOMPurify, { type DOMPurifyI } from 'dompurify';

let serverPurifier: DOMPurifyI | null = null;

function getPurifier(): DOMPurifyI {
  if (typeof window !== 'undefined') {
    return createDOMPurify(window);
  }

  if (!serverPurifier) {
    const { window } = new JSDOM('');
    serverPurifier = createDOMPurify(window as unknown as Window);
  }

  return serverPurifier;
}

export function sanitizeHtml(html: string): string {
  return getPurifier().sanitize(html, {
    ALLOWED_TAGS: [
      'a',
      'abbr',
      'b',
      'blockquote',
      'br',
      'code',
      'em',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'hr',
      'li',
      'ol',
      'p',
      'pre',
      'strong',
      'ul'
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel']
  });
}
