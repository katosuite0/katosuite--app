import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

let purifier: ReturnType<typeof createDOMPurify> | null = null;

function getPurifier() {
  if (typeof window !== 'undefined') {
    return createDOMPurify(window as unknown as any);
  }

  if (!purifier) {
    const { window } = new JSDOM('').window;
    purifier = createDOMPurify(window as unknown as any);
  }

  return purifier;
}

export function sanitizeHtml(html: string) {
  const activePurifier = getPurifier();
  return activePurifier.sanitize(html, {
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
