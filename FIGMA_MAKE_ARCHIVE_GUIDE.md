# Figma Make AI Archive Guide

This guide explains how to generate the production archive consumed by the Figma Make AI automation.

## 1. Prepare your workspace
1. Checkout the release branch.
2. Run `pnpm install` and `pnpm build` to ensure the bundle compiles.
3. Confirm `.env.local` mirrors the environment variables listed in `VERCEL_ENVIRONMENT_VARIABLES.md`.

## 2. Run the archive script
```
chmod +x scripts/create-archive.sh
./scripts/create-archive.sh
```
The script copies the project into `archive/`, prunes development-only files, and produces a `.zip` file alongside a SHA-256 checksum and manifest.

## 3. Verify required assets
Before sharing the archive, confirm the manifest lists:
- Application source (App Router, components, Supabase helpers)
- Deployment runbooks and guidelines
- Environment templates and linting configuration
- Pricing plans, entitlements, and watermark policy modules

If any entry is missing, rerun the script after restoring the file.

## 4. Deliver the archive
Upload the `.zip` and `.sha256` files to your preferred storage location (GitHub release, Google Drive, or secure file-share) and notify stakeholders via the #katosuite-launch Slack channel.

## 5. Next steps
- Run through `PRODUCTION_READY_FINAL.md` before launch day.
- Use `deploy-to-github-vercel.sh` to perform the GitHub push.
- Complete the smoke tests outlined in `FINAL_DEPLOYMENT_CHECKLIST.md` once Vercel finishes building.
