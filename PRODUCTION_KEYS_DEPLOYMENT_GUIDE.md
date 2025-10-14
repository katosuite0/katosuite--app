# 🔐 Production Keys Deployment Guide

**Status:** Production-ready when all required keys are stored in Vercel (never in the repository).

---

## ✅ Required Services & Variables

| Service | Purpose | Required Variables | Notes |
| --- | --- | --- | --- |
| Supabase | Database, auth, edge functions | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Service role must remain server-side only. |
| Application URLs | Public site + API routing | `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL` | Use production hostname only after DNS cutover. |
| Stripe | Payments & subscriptions | `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*` | Rotate keys after incidents and whenever staff changes. |
| OAuth (GitHub) | Social login | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXTAUTH_SECRET` | Add production callback URL in GitHub settings. |
| Analytics | Product analytics & conversions | `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_PINTEREST_TAG_ID` | Client-safe values only. |
| Notifications | Slack / email | `SLACK_LIVE_API_KEY`, `RESEND_API_KEY` (optional) | Keep optional keys documented even if not yet provisioned. |

Store optional integrations (PostHog, Sentry, etc.) with the same process once activated.

---

## 🗂️ Vercel Configuration Steps

1. Open the Vercel project → **Settings → Environment Variables**.
2. Add each variable above with its production value.
3. Mark secrets as encrypted (default for non-`NEXT_PUBLIC_*`).
4. Double-check the **Environment** column is set to **Production**.
5. Export the environment to a local `.env.production` file only if your security policy allows, and store it in a password manager.

---

## 🔁 Stripe Webhook Checklist

1. Create/update the production endpoint at `https://<supabase-project>.supabase.co/functions/v1/stripe-webhook`.
2. Subscribe to:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `checkout.session.completed`
3. Copy the generated signing secret and paste it into the Vercel variable `STRIPE_WEBHOOK_SECRET`.
4. (Optional) Add an audit endpoint for verbose logging.
5. Test with `stripe trigger checkout.session.completed` after deployment.

---

## 🔎 Security Guardrails

- Keep secrets out of git history; rotate immediately if something leaks.
- Restrict dashboard access (Vercel, Supabase, Stripe) to the smallest group possible.
- Enable MFA on every provider account.
- Audit Vercel logs (`vercel logs --follow`) during the first 24 hours after launch.
- Review Supabase RLS policies before flipping any new tables to production.

---

## 🆘 Rotation & Incident Response

| Service | Rotation Cadence | Immediate Actions after Incident |
| --- | --- | --- |
| Stripe | Every 90 days | Regenerate API keys + webhook secret, update Vercel, redeploy. |
| OpenAI / Anthropic | Every 180 days | Rotate API keys, invalidate old keys in provider dashboard. |
| Supabase Service Role | Annually or on role changes | Update Vercel secret, restart any long-lived workers. |
| JWT / Encryption Keys | Annually | Re-encrypt secrets, invalidate stale tokens. |

Maintain a secure record of previous values while rotating so you can roll back if necessary.

---

## ✅ Pre-Deploy Confirmation

Before pushing the production release, ensure:

- [ ] All P0 keys added to Vercel with production scope.
- [ ] Stripe webhooks configured and tested.
- [ ] `.env.local` mirrors the safe subset needed for local QA (no service role key).
- [ ] Support runbooks updated with the latest credential locations.
- [ ] Secrets are stored in your team password manager.

Once the checklist is complete, run `./deploy-to-github-vercel.sh` and follow the prompts to push and deploy.
