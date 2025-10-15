# KatoSuite Web Application

KatoSuite is a Next.js 14 application that helps educators design inclusive lesson plans, automate compliance, and prepare release-ready deployments. The repository includes a localized marketing experience, a dashboard preview, sanitized rich text rendering with DOMPurify, and a scripted deployment helper that automates the historical 11-step validator.

## ✨ Highlights

- **Internationalization** – `/en` and `/fr` experiences share a common layout, locale switcher, and translation dictionaries.
- **Secure content rendering** – User-provided copy is cleaned with DOMPurify on both server and client through a shared helper.
- **Health endpoint** – `GET /api/health` returns `{ ok: true }` for quick uptime checks.
- **Supabase ready** – A typed client wrapper warns when environment variables are missing.
- **Tailwind-powered UI** – Reusable buttons, cards, and layout primitives keep the app consistent.
- **Plan-aware pricing** – Pricing table pulls from `config/plans.json`, entitlements, and watermark policy helpers.
- **Smoke test coverage** – Vitest exercises the sanitizer and ensures malicious markup is removed.
- **Deployment helper** – `deploy-to-github-vercel.sh` mirrors the 11-step validation workflow before suggesting the `git push` command.

## 🧱 Project Structure

```
app/                Next.js App Router pages and API routes
components/         Reusable UI, localization, and marketing modules
i18n/               Type-safe locale dictionaries
lib/                Utilities, including DOMPurify sanitization
supabase/           Supabase client bootstrap (optional at runtime)
public/             Static assets and locale placeholders
config/             Application-wide configuration objects (plans, flow map, site constants)
tests/              Vitest suite
```

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

Visit <http://localhost:3000> to explore the English experience. Switch languages with the locale toggle in the header.

## ✅ Available Scripts

| Command           | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `pnpm dev`        | Start the development server                              |
| `pnpm build`      | Create a production build                                 |
| `pnpm start`      | Serve the production build                                |
| `pnpm lint`       | Run ESLint using the Next.js shareable config             |
| `pnpm typecheck`  | Execute TypeScript in no-emit mode                        |
| `pnpm test`       | Run Vitest (JS DOM environment)                           |
| `pnpm archive`    | Package the Figma Make archive into `archive/`            |

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in values before integrating with live services:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `PINTEREST_CONVERSION_TOKEN`

Keep secrets outside of version control and mirror production values in Vercel settings before each release.

## 📦 Deployment Helper

The helper mirrors the historical codex deployment workflow and concludes with the full Vercel playbook:

```bash
chmod +x deploy-to-github-vercel.sh && ./deploy-to-github-vercel.sh "feat: KatoSuite production launch"
```

It validates tooling, summarizes repository changes, prints the `git push codex HEAD` command, and reiterates the post-push Vercel rollout steps. After pushing, deploy with `vercel --prod` and complete the smoke tests in `FINAL_DEPLOYMENT_CHECKLIST.md`.

## 📚 Additional Guides

- [`START_DEPLOYMENT_HERE.md`](./START_DEPLOYMENT_HERE.md) – Workstation setup
- [`READY_TO_DEPLOY.md`](./READY_TO_DEPLOY.md) – Preflight checklist
- [`FINAL_DEPLOYMENT_CHECKLIST.md`](./FINAL_DEPLOYMENT_CHECKLIST.md) – Post-release validation
- [`PRODUCTION_KEYS_DEPLOYMENT_GUIDE.md`](./PRODUCTION_KEYS_DEPLOYMENT_GUIDE.md) – Secure secrets management
- [`FIGMA_MAKE_ARCHIVE_GUIDE.md`](./FIGMA_MAKE_ARCHIVE_GUIDE.md) – Steps to generate the Figma Make archive
- [`PRODUCTION_READY_FINAL.md`](./PRODUCTION_READY_FINAL.md) – Final pre-launch checklist
- [`CODEX_DEPLOYMENT_GUIDE.md`](./CODEX_DEPLOYMENT_GUIDE.md) – Validator, push, and rollback playbook

## 🛡️ Security & QA

- Sanitization lives in [`lib/sanitize-html.ts`](./lib/sanitize-html.ts) and is covered by [`tests/sanitize-html.test.ts`](./tests/sanitize-html.test.ts).
- Locale dictionaries are enforced through the `TranslationProvider`, ensuring text is available for each supported language.
- The deployment helper refuses to push without confirmation so you can review warnings before launch.

## 🤝 Contributing

1. Fork the repository and create a feature branch.
2. `pnpm install` to sync dependencies.
3. Update or add tests to cover your changes.
4. Run `pnpm lint && pnpm typecheck && pnpm test`.
5. Commit using conventional messages.
6. Open a pull request and describe the user impact.

Built by educators, for educators. 🎓
