# Codex Deployment Guide

Use this playbook alongside the README when you are preparing a production push. Each phase links out to the supporting checklists that live in this repository.

## Phase 1 – Workstation readiness

1. Walk through [`START_DEPLOYMENT_HERE.md`](./START_DEPLOYMENT_HERE.md) to install tooling and authenticate services (GitHub, Supabase, Stripe, Vercel).
2. Populate `.env.local` with the same non-secret values that exist in Vercel (see the production keys guide).
3. Run `pnpm install` so the validator can execute lint/build tasks when available.

## Phase 2 – Pre-flight checks

1. Follow [`READY_TO_DEPLOY.md`](./READY_TO_DEPLOY.md) to ensure quality gates, migration state, and feature smoke tests are complete.
2. Capture any missing production secrets with the reference list in [`PRODUCTION_KEYS_DEPLOYMENT_GUIDE.md`](./PRODUCTION_KEYS_DEPLOYMENT_GUIDE.md).
3. Confirm rollback steps are documented for the release and that all stakeholders are notified of the deployment window.

## Phase 3 – Validator workflow

1. Make the helper executable: `chmod +x deploy-to-github-vercel.sh`.
2. Run the helper with a descriptive commit message: `./deploy-to-github-vercel.sh "feat: summarize release"`.
3. Resolve every warning that surfaces (environment variables, missing tooling, build failures) before proceeding.
4. When the helper prints the push command (usually `git push codex HEAD`), copy it for the final step after review.

## Phase 4 – Push & monitor

1. Push using the helper's instructions and authenticate with the `katosuite0` GitHub account + Personal Access Token (`repo` scope).
2. Trigger `vercel --prod` or approve the dashboard deployment when GitHub finishes building.
3. Execute the smoke tests from [`FINAL_DEPLOYMENT_CHECKLIST.md`](./FINAL_DEPLOYMENT_CHECKLIST.md) including OAuth, Stripe webhook, PDF export, and health endpoint.
4. Monitor Vercel logs and Supabase metrics for at least 30 minutes after go-live.

## Phase 5 – Rollback plan

1. Keep the previous deployment URL handy to roll back quickly from the Vercel dashboard.
2. If issues arise, revert the offending commit and re-run the helper to ship the fix.
3. Document the incident with owner, scope, resolution, and any follow-up tasks in the ops channel.

Staying disciplined with these steps ensures the 11-step validator workflow delivers predictable deployments every time.
