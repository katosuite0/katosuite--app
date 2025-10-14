# Ready to Deploy Checklist

Confirm everything in this list before you run `./deploy-to-github-vercel.sh`.

## Code quality

- [ ] `pnpm run lint`
- [ ] `pnpm run typecheck`
- [ ] `pnpm run test` (if suites exist)
- [ ] `pnpm run build`

## Environment parity

- [ ] `.env.local` matches the Vercel production environment
- [ ] Supabase migrations applied via `pnpm supabase db push`
- [ ] Stripe products/prices synced via `stripe sync prices`

## Feature validation

- [ ] GitHub OAuth returns to the dashboard with a valid session
- [ ] `stripe trigger checkout.session.completed` updates entitlements in Supabase
- [ ] `curl -X POST http://localhost:3000/functions/v1/export/pdf` returns a signed URL
- [ ] `/api/health` returns `{ "ok": true }`

## Deployment prep

- [ ] `./deploy-to-github-vercel.sh "feat: concise summary"` staged the release commit
- [ ] Branch is up to date with `codex/main`
- [ ] Rollback plan documented (see README)

When all boxes are checked you are ready to push to `codex` and kick off the Vercel production deploy.
