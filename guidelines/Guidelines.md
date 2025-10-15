# KatoSuite Product Guidelines

## Accessibility
- Maintain a minimum 44×44px touch target for buttons and links.
- Provide focus outlines with a 3:1 contrast ratio against adjacent colors.
- Ensure headings follow a logical hierarchy without skipping levels.

## Brand Voice
- Emphasize measurable educator outcomes and clarity over hype.
- Use present tense and speak directly to educators (“you/your team”).
- Avoid jargon that families or new teachers may not understand.

## Visual Language
- Base palette on Tailwind tokens (`brand-50` through `brand-900`).
- Reserve gradients and animations for hero experiences only.
- Use rounded corners (20px+) for marketing cards to mirror the app shell.

## Content Standards
- Translate new strings into English and French before merging.
- Cite real policies or sources when referencing compliance frameworks.
- Keep product claims tied to functionality that exists in production.

## Compliance Checklist
1. Stripe checkout succeeds in both USD and CAD test modes.
2. Supabase Row Level Security remains enabled for all tables.
3. PDF exports watermark drafts until entitlements elevate the user.
4. Pinterest Conversion API is configured with the documented token.
5. Health endpoint (`/api/health`) continues to return `{ ok: true }`.

Review this document during QA sign-off to keep the product launch-ready.
