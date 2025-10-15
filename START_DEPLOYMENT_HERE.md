# Start Deployment Here

Use this quick-reference guide the first time you prepare a KatoSuite release.

## 1. Install prerequisites

- Node.js 18+
- pnpm 8+
- Git with HTTPS access to `github.com`
- Stripe CLI (for webhook verification)
- Supabase CLI (optional but recommended for env validation)

## 2. Prepare the deployment helper

```bash
chmod +x deploy-to-github-vercel.sh
```

This ensures the one-command workflow described in the README is ready to run.

## 3. Configure secrets locally

Create a `.env.local` with the values from Vercel → Project Settings → Environment Variables.

At minimum you need:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXTAUTH_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

## 4. Authenticate dependencies

```bash
pnpm install
pnpm dlx supabase login
stripe login
vercel login
```

## 5. Run a local smoke test

```bash
pnpm dev
```

1. Sign in with GitHub on `http://localhost:3000`.
2. Complete a Stripe Checkout via `stripe trigger checkout.session.completed`.
3. Hit `http://localhost:3000/api/health` and confirm `{ "ok": true }`.

If any check fails, resolve locally before you continue to the deployment workflow in the README.
