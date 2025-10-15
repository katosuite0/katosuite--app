# Production Readiness Checklist

Use this checklist during the final hour before launching a KatoSuite release.

## Application health
- [ ] `pnpm build` succeeds locally and on CI.
- [ ] `/api/health` responds with `{ ok: true }` in production.
- [ ] Locale switcher persists between routes.
- [ ] Dashboard metrics render without console warnings.

## Integrations
- [ ] Supabase service role key scoped to production project.
- [ ] Stripe webhook deliveries succeed and entitlements update.
- [ ] Pinterest Conversion API events appear in Ads Manager within 24h.
- [ ] Resend (or email provider) API key present in Vercel.

## Security & compliance
- [ ] No secrets committed to git (`git ls-files -i --exclude-standard` returns empty).
- [ ] Row Level Security policies verified in Supabase dashboard.
- [ ] PDF exports respect watermark policy by plan tier.
- [ ] Guidelines in `guidelines/Guidelines.md` reviewed with QA lead.

## Deployment
- [ ] `deploy-to-github-vercel.sh` run with successful validator output.
- [ ] Vercel deployment promoted to production (`vercel --prod`).
- [ ] Smoke tests in `FINAL_DEPLOYMENT_CHECKLIST.md` executed and logged.
- [ ] Archive packaged following `FIGMA_MAKE_ARCHIVE_GUIDE.md` and shared with stakeholders.

Sign-off requires all boxes checked with supporting evidence in the release document.
