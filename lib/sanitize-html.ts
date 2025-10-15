import createDOMPurify from 'dompurify';

/**
 * Client-side HTML sanitization using DOMPurify.
 * 
 * Note: This function only works in browser environments.
 * On the server side, it returns the input unchanged.
 * Ensure all HTML content is from trusted sources or validated before use.
 * 
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML safe for rendering
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: DOMPurify requires a DOM, so we cannot sanitize here.
    // This function should only be called from client components.
    console.warn('sanitizeHtml called on server - returning unsanitized content. Use only in client components.');
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
