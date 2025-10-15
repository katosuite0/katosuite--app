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

The script performs the following actions:

- Cleans any existing artifacts under `archive/`
- Copies the repository while excluding caches, dependencies, and environment files
- Confirms that must-have application assets and documentation are present
- Compresses the archive into a `.zip`
- Generates a SHA-256 checksum and manifest summary
- Verifies the `.zip` integrity before exiting

All artifacts are written to `archive/` and include:

- `katosuite-production-v1.0.0/` – working directory clone
- `katosuite-production-v1.0.0.zip` – distributable bundle
- `katosuite-production-v1.0.0.sha256` – checksum for verification
- `katosuite-production-v1.0.0-manifest.txt` – generated manifest with next steps

## 3. Validate output

Before sharing the archive, confirm the manifest lists:

- Application source (App Router, components, Supabase helpers)
- Deployment runbooks and guidelines
- Pricing data, entitlement policies, and watermark rules
- Licensing and compliance documentation

## 4. Deliver the archive

Share the `.zip` and checksum with stakeholders via the approved channels:

- GitHub release asset
- Secure Google Drive folder
- Encrypted email to `figma-make-support@katosuite.com`

Encourage the recipient to verify the checksum before importing into Figma Make AI.
