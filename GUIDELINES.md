# KatoSuite Contribution Guidelines

This repository powers the educator-facing marketing site and dashboard preview. Please follow these principles before opening a pull request:

1. **Respect accessibility baselines.** Interactive elements must offer a 44×44px minimum hit area, include visible focus states, and pass color-contrast requirements.
2. **Prefer type-safe integrations.** Reach for generated clients or typed wrappers when interacting with Supabase, Stripe, or third-party APIs.
3. **Guard user trust.** Do not introduce copy that overstates impact (e.g., “guaranteed growth”). Marketing statements must remain verifiable.
4. **Keep localization in sync.** Every new string should be added to `i18n/dictionaries.ts` with English and French translations.
5. **Protect secrets.** Environment variables belong in Vercel or `.env.local`; never commit production keys to version control.
6. **Run quality gates.** Execute `pnpm lint`, `pnpm typecheck`, and `pnpm test` locally before submitting changes.

Refer to `guidelines/Guidelines.md` for detailed UX, brand, and compliance guidance.
