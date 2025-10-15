'use client';

import { useMemo } from 'react';
import createDOMPurify from 'dompurify';

export function SanitizedContent({ html }: { html: string }) {
  const sanitized = useMemo(() => {
    if (typeof window !== 'undefined') {
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
    return html;
  }, [html]);

  return (
    <div
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
