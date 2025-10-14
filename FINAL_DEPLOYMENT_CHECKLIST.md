# Final Deployment Checklist

Complete these steps immediately before and after pushing to production.

## Pre-push

1. Review `git status` and confirm only intentional changes are staged.
2. Run `pnpm run build` to ensure a clean production build.
3. Execute `./deploy-to-github-vercel.sh "feat: describe release"` and confirm the script prints the final `git push` command.
4. Resolve any warnings surfaced by the helper before continuing.

## Push & monitor

1. Push with the command suggested by the helper (typically `git push codex HEAD`).
2. Watch the GitHub Actions workflow (if enabled) until it succeeds.
3. Trigger a Vercel production deploy via `vercel --prod` or the dashboard.
4. Monitor the Vercel build logs for any warnings or regressions.

## Post-deploy smoke tests

- GitHub OAuth login completes and returns a valid session cookie.
- Stripe webhook (`stripe trigger checkout.session.completed`) updates the user entitlement flag in Supabase.
- `POST https://<production-domain>/functions/v1/export/pdf` responds with a signed URL.
- `https://<production-domain>/api/health` returns `{ "ok": true }`.

## Rollback procedure

1. Identify the previous successful deployment in Vercel and click **Rollback**.
2. Revert the offending commit locally: `git revert <sha>`.
3. Push the revert commit using `./deploy-to-github-vercel.sh` and monitor the redeploy.
4. Communicate the rollback in the #ops channel with the incident details and follow-up tasks.
