'use client';

import { useMemo } from 'react';
import { sanitizeHtml } from '@/lib/sanitize-html';

export function SanitizedContent({ html }: { html: string }) {
  const sanitized = useMemo(() => sanitizeHtml(html), [html]);

  return (
    <div
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
