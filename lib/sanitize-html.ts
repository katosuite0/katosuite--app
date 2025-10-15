import createDOMPurify from 'dompurify';

export function sanitizeHtml(html: string) {
  if (typeof window === 'undefined') {
    // Server-side: return as-is, sanitization will happen on client
    return html;
  }

  // Client-side: use dompurify with window
  const purifier = createDOMPurify(window);
  return purifier.sanitize(html, {
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
