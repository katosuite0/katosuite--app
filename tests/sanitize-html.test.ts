import { describe, expect, it } from 'vitest';
import { sanitizeHtml } from '@/lib/sanitize-html';

describe('sanitizeHtml', () => {
  it('removes script tags while preserving allowed markup', () => {
    const dirty = '<h1>Hello</h1><script>alert(1)</script><p>Safe content</p>';
    const sanitized = sanitizeHtml(dirty);
    expect(sanitized).toContain('<h1>Hello</h1>');
    expect(sanitized).toContain('<p>Safe content</p>');
    expect(sanitized).not.toContain('<script>');
  });

  it('allows anchor tags with safe attributes only', () => {
    const dirty = '<a href="https://katosuite.com" onclick="evil()">Link</a>';
    const sanitized = sanitizeHtml(dirty);
    expect(sanitized).toBe('<a href="https://katosuite.com">Link</a>');
  });
});
