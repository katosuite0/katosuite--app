 codex/add-automated-github-deployment-script
# 🚀 Deploy KatoSuite in Minutes

This repository is prepped for the 11-step validator workflow that the `deploy-to-github-vercel.sh` helper guides you through. Keep this README open as you ship.

---

## ⚡ One-Command Deployment

```bash
chmod +x deploy-to-github-vercel.sh && ./deploy-to-github-vercel.sh "feat: KatoSuite production launch"
```

The script validates your environment, aligns the `codex` remote, stages changes, and prints the exact `git push` command when you confirm the release.

---

## 🧭 Step-by-Step Playbook

1. **Prep the helper** – `chmod +x deploy-to-github-vercel.sh` (one-time).
2. **Run the validator** – `./deploy-to-github-vercel.sh "feat: concise summary"`.
3. **Review the output** – address any warnings about missing environment variables or tooling.
4. **Push to GitHub** – use the command echoed at the end of the script (`git push codex HEAD`).
5. **Trigger Vercel** – `npm i -g vercel && vercel login && vercel --prod`.
6. **Smoke test production** – follow [`FINAL_DEPLOYMENT_CHECKLIST.md`](./FINAL_DEPLOYMENT_CHECKLIST.md).

Additional onboarding context lives in:

- [`START_DEPLOYMENT_HERE.md`](./START_DEPLOYMENT_HERE.md) – workstation setup and prerequisite tooling.
- [`READY_TO_DEPLOY.md`](./READY_TO_DEPLOY.md) – preflight checklist to complete before running the helper.
- [`PRODUCTION_KEYS_DEPLOYMENT_GUIDE.md`](./PRODUCTION_KEYS_DEPLOYMENT_GUIDE.md) – how to provision secrets safely for Vercel.

---

## ✅ 11-Step Validator Overview

The helper walks through the historical validation flow:

1. Environment validation (Node 18+, pnpm, git).
2. Pinterest conversion token presence.
3. Security and secrets scan reminder.
4. Guidelines review (if `GUIDELINES.md` exists).
5. TypeScript compile (`pnpm run typecheck` when available).
6. Production build (`pnpm run build` when available).
7. Repository summary (`git status -sb`).
8. Git status review and env warning recap.
9. User confirmation prompt.
10. Commit preparation and remote alignment (`codex → https://github.com/katosuite0/katosuite--app.git`).
11. Push + Vercel deployment instructions.

> The helper exits early if you decline the confirmation prompt, giving you a chance to fix any issues and re-run it.

---

## 🔐 Authentication & Security

When Git prompts for credentials, sign in with the `katosuite0` GitHub account and a Personal Access Token that includes the `repo` scope. Generate tokens at <https://github.com/settings/tokens> and store them securely (1Password, Bitwarden, etc.).

Never commit plaintext secrets. All production values belong in Vercel environment variables; mirror only the safe subset (e.g., `NEXT_PUBLIC_*`) in your local `.env.local` for testing. Reference the [`PRODUCTION_KEYS_DEPLOYMENT_GUIDE.md`](./PRODUCTION_KEYS_DEPLOYMENT_GUIDE.md) for the canonical list.

---

## 🌐 OAuth, Stripe, and Integrations

- **GitHub OAuth** – configure callback `https://<vercel-domain>/api/auth/callback/github`. Store `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in Vercel.
- **Stripe** – set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and price IDs in Vercel. Use `stripe trigger checkout.session.completed` to confirm Supabase entitlements update.
- **Pinterest** – keep `PINTEREST_CONVERSION_TOKEN` in Vercel. The helper warns if it is absent locally.
- **Supabase** – lock down RLS policies and confirm all required URLs/keys are present.

---

## ♻️ Rollback & Recovery

1. Use the Vercel dashboard to roll back to the last healthy deployment if needed.
2. Revert the offending commit locally (`git revert <sha>`).
3. Re-run `./deploy-to-github-vercel.sh` to stage and validate the fix.
4. Push to `codex`, redeploy, and execute the smoke tests in [`FINAL_DEPLOYMENT_CHECKLIST.md`](./FINAL_DEPLOYMENT_CHECKLIST.md).

---

## 🆘 Troubleshooting Commands

```bash
git remote -v
git status -sb
node -v; pnpm -v
rm -rf node_modules .next && pnpm install && pnpm build
```

Keep the checklist handy, follow the helper output, and you will stay on track for production releases.

# KatoSuite

A comprehensive lesson planning platform built with Next.js, TypeScript, and modern web technologies.

## Features

- 🌍 **Internationalization**: Support for English and French
- 💳 **Multiple Plans**: Free, Starter+, and Pro plans with different features
- 📚 **Library**: Automatic saving of valid lessons (Starter+ and Pro only)
- 🤖 **AI Generation**: AI-powered lesson content generation (Starter+ and Pro)
- 📤 **Export**: Export lessons with plan overlay and footer
- 🔒 **Authentication**: Supabase authentication with Row Level Security
- 💰 **Payment**: Stripe integration for subscriptions
- 📧 **Email**: SendGrid for transactional emails
- ⚡ **Rate Limiting**: 10 requests/minute for AI and export endpoints
- 🧪 **Testing**: Playwright with axe-core for accessibility testing
- 📊 **Performance**: Lighthouse CI for performance monitoring
- 🔍 **SEO**: Sitemap, robots.txt, and JSON-LD structured data

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Authentication**: Supabase
- **Payments**: Stripe
- **Email**: SendGrid
- **Testing**: Playwright + axe-core
- **Linting**: ESLint
- **Performance**: Lighthouse CI

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase, Stripe, and SendGrid credentials.

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
katosuite--app/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Root layout with i18n
│   │   ├── page.tsx       # Homepage
│   │   ├── pricing/       # Pricing page
│   │   └── library/       # Library page
│   ├── api/               # API routes
│   │   ├── library/       # Library endpoints
│   │   ├── export/        # Export endpoints
│   │   └── ai/            # AI generation endpoints
│   ├── globals.css        # Global styles
│   └── sitemap.ts         # Dynamic sitemap
├── config/
│   └── plans.json         # Plan configurations and limits
├── i18n/
│   ├── messages/          # Translation files
│   ├── request.ts         # i18n configuration
│   └── routing.ts         # i18n routing
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── plans.ts           # Plan utilities
│   └── rate-limit.ts      # Rate limiting
├── public/
│   └── robots.txt         # Robots configuration
└── tests/
    └── accessibility.spec.ts  # Playwright tests

```

## Configuration

### Plans

Plan configurations are stored in `config/plans.json`. Each plan includes:
- Pricing in USD (no trial text)
- Feature flags (library, AI generation, export)
- Rate limits (lessons per month, exports per minute, AI requests per minute)

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `SENDGRID_API_KEY`: SendGrid API key
- `NEXT_PUBLIC_BASE_URL`: Application base URL

## Features

### Library (Starter+ and Pro)

- Automatically saves valid lessons (no author/date stored)
- Only accessible to Starter+ and Pro users
- Implements Row Level Security with Supabase

### Export

- All plans can export lessons
- Free plan shows upgrade overlay
- Immutable footer ≤14px
- Rate limited to 10 exports per minute

### Rate Limiting

- AI generation: 10 requests/minute
- Export: 10 requests/minute
- Tracked per user/IP address

### Idempotent POSTs

All POST endpoints support idempotency keys to prevent duplicate operations.

## Testing

Run Playwright tests:
```bash
pnpm test
```

Run accessibility tests with axe-core:
```bash
pnpm test accessibility
```

## Linting

Run ESLint:
```bash
pnpm lint
```

ESLint is configured for:
- Semantic HTML headings
- Accessibility rules
- TypeScript best practices
- Files under 300 lines of code

## Deployment

Deploy to Vercel:
```bash
vercel
```

The project includes `vercel.json` for proper configuration.

## License

Apache 2.0
 main
